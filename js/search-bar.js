let input = document.querySelector("input[type='text']"),
	form = document.querySelector("form"),
	dataForm = new FormData(form),
	btnSearch = document.querySelector(".btn-search");

form.addEventListener("submit", (e) => {
	e.preventDefault()
	if (input.value != "") {

		value = input.value.toLowerCase().replace(/[^\w\s]/gi, "").trim().replace(/[ ]/g, "-");
		location.href = `/search/?q=${value}`
	}
})

window.addEventListener('resize', () => {
	let windowWidth = window.innerWidth;
	if (windowWidth <= 670) {

	}
})

function toggleInput() {
	btnSearch.addEventListener("click", () => {
		input.classList.add("active")
		document.querySelector("body").addEventListener("click", (e) => {
			let target = e.target;
			if (!target.classList.contains("clickOutside") && input.classList.contains("active")) {
				input.classList.remove("active");
				input.style.animation= "animationInputClose 1s forwards"
			setTimeout(()=>{
								input.style.animation= ""
			},1000)
			//	input.style.display="flex";
			//	input.style.visibility="1";
			//	input.style.right="calc(25vw - 2rem)";

			}
		})
	})
}
toggleInput()