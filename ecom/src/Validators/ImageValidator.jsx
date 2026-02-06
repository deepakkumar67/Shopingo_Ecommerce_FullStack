export default function ImageValidator(e) {
    if (e.target.files && e.target.files.length === 1) {
        let pic = e.target.files[0]
        if (!(["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(pic.type)))
            return "Invalid Pic Type, Please Upload .jpg,.jpeg,.png,.gif Image Only "
        else if (pic.size > 1048576)
            return "Pic Size is Too Heavy, Please Upload an Image Upto 1 MB"
        else
            return ""
    }
    else {
        let errorMessage = []
        Array.from(e.target.files).forEach((pic, index) => {
            if (!(["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(pic.type)))
                errorMessage.push(`Invalid Pic ${index + 1} Type, Please Upload .jpg,.jpeg,.png,.gif Image Only. `)
            else if (pic.size > 1048576)
                errorMessage.push(`Pic ${index + 1} Size is Too Heavy, Please Upload an Image Upto 1 MB. `)
        })
        return errorMessage.length ? errorMessage : ""
    }
}
