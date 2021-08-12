const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function loadContent() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

loadContent();

async function changeObject(name, url, del) {
    let lastUrl = del ? "&del=1" : "";

    const res = await fetch("http://localhost:3000/?name="+name+"&url="+url+lastUrl).then((data) => data.json())
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, name, url)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el, name, url) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove();
        changeObject(name, url, true);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    changeObject(name, url, false);
    addElement({ name, url });

    input.value = ""
})