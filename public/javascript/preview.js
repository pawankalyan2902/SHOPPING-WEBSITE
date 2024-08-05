const choose_file=document.getElementById("image");
const preview=document.querySelector(".preview");

function previews()
{
    //when the file name changes event listner is triggered and the file url is placed in the image src
    preview.style.display="block"
    const file=choose_file.files;
    console.log(choose_file.files)
    const [data]=file;
    console.log(data);
    preview.src=URL.createObjectURL(data);
}

choose_file.addEventListener("change",previews);

