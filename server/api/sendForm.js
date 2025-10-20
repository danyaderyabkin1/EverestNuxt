import {defineEventHandler} from 'h3';
import {FormData} from "node-fetch-native";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const newFormData = new FormData();

    formData.forEach(el => {
        newFormData.append(el.name, el.data)
    });
    await $fetch('https://wecrm.ru/api/processFeedbackForm', {
        method: "POST",
        body: newFormData,
    })
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => error)
})