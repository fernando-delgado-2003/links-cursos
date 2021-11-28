let input = document.querySelector("input[type='search']"),
	form = document.querySelector("form"),
	dataForm = new FormData(form);

form.addEventListener("submit", (e) => {
	e.preventDefault()
	value = input.value.toLowerCase().replace(/[^\w\s]/gi, "").trim().replace(/[ ]/g, "-");
	location.href=`/search/?q=${value}`
})