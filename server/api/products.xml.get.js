export default defineEventHandler(async (event) => {
    // Устанавливаем заголовок для XML
    setResponseHeader(event, 'Content-Type', 'text/xml')

    // Получаем хост
    const host = getRequestHeader(event, 'host') || 'b.otellica.ru'
    const targetDomain = 'b.otellica.ru'

    try {
        // 1. Получаем 4 основные категории (уровень 1)
        const mainCategoriesRes = await $fetch(`https://b.otellica.ru/api/shop/categories?domain=${targetDomain}`)
        const mainCategories = (mainCategoriesRes.data?.categories || [])

        // 2. Для каждой основной категории получаем подкатегории
        const subCategoriesPromises = mainCategories.map(mainCategory =>
            $fetch(`https://b.otellica.ru/api/shop/categories?domain=${targetDomain}&parentId=${mainCategory.id}`)
                .then(res => ({
                    mainCategory,
                    subCategories: res.data?.categories || []
                }))
                .catch(() => ({
                    mainCategory,
                    subCategories: []
                }))
        )

        const categoriesWithSubs = await Promise.all(subCategoriesPromises)

        // 3. Для всех подкатегорий получаем товары
        const productsPromises = categoriesWithSubs.flatMap(item =>
            item.subCategories.map(subCategory =>
                $fetch(`https://b.otellica.ru/api/shop/products?domain=${targetDomain}&categoryId=${subCategory.id}`)
                    .then(res => ({
                        mainCategory: item.mainCategory,
                        subCategory,
                        products: (res.data?.products || []).filter(p => {
                            // Фильтруем товары: должны иметь SKU и не иметь поля notInStock
                            const hasSku = p.sku?.length
                            const isNotInStock = p.fields?.some(field =>
                                field.field_title === "notInStock"
                            )
                            return hasSku && !isNotInStock
                        })
                    }))
                    .catch(() => ({
                        mainCategory: item.mainCategory,
                        subCategory,
                        products: []
                    }))
            )
        )

        const categoryProducts = await Promise.all(productsPromises)

        // 4. Формируем общий массив всех товаров с информацией о категориях
        const allProducts = categoryProducts.flatMap(cp =>
            cp.products.map(p => ({
                ...p,
                mainCategoryId: cp.mainCategory.id,
                mainCategoryTitle: cp.mainCategory.title,
                subCategoryId: cp.subCategory.id,
                subCategoryTitle: cp.subCategory.title
            }))
        )

        // 5. Собираем все категории для XML (основные + подкатегории)
        const allCategories = [
            ...mainCategories,
            ...categoriesWithSubs.flatMap(item => item.subCategories)
        ]

        // Генерируем XML
        return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>Otellica</name>
    <url>${host}</url>
    <platform>Moovix</platform>
    <categories>
        ${allCategories.map(c => `
        <category id="${c.id}"${c.parent_id ? ` parentId="${c.parent_id}"` : ''}>${c.title}</category>
        `).join('')}
    </categories>
    <offers>
        ${allProducts.map(p => `
        <offer id="${p.id}">
            <name>${escapeXml(p.title)}</name>
            <description>${escapeXml(p.preview_content)}</description>
            <url>https://${host}/${p.slug || p.id}</url>
            <price>${p.sku?.[0]?.price || 0}</price>
            <currencyId>RUB</currencyId>
            <categoryId>${p.subCategoryId || p.mainCategoryId || 0}</categoryId>
            ${p.preview_image ? `<picture>${p.preview_image}</picture>` : ''}
            ${p.sku?.[0]?.old_price ? `<oldprice>${p.sku[0].old_price}</oldprice>` : ''}
            <param name="Основная категория">${escapeXml(p.mainCategoryTitle)}</param>
            <param name="Подкатегория">${escapeXml(p.subCategoryTitle)}</param>
        </offer>
        `).join('')}
    </offers>
  </shop>
</yml_catalog>`

    } catch (error) {
        console.error('Error generating XML feed:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to generate product feed'
        })
    }
})

// Функция для экранирования XML-спецсимволов
const escapeXml = (unsafe) =>
    unsafe?.replace(/[<>&'"]/g, c => ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '\'': '&apos;',
        '"': '&quot;'
    }[c] || c)) || ''