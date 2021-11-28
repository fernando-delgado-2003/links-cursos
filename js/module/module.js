let allTags = null;
getTags()
	.then((res) => {
		localStorage.setItem("tags", JSON.stringify(res))
		allTags = res;
	})

function getTags() {
	return new Promise((resolve, reject) => {

		fetch('../js/data/tags.json')
			.then(res => res.json())
			.then(data => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})

}

function handleCards(data) {
	let templateCards = "",
		templateTags = "",
		nameFilter;
	allTags = allTags == null ? JSON.parse(localStorage.getItem("tags")) : allTags;

	data.forEach(item => {
		if (item.name != "") {

			if (allTags != null) {
				item.idTags.forEach((id) => {
					allTags.forEach((tag) => {
						if (id == tag.id) {
							templateTags += `<a href="/search/?id=${tag.id}" style="background: ${tag.color};">${tag.tag}</a>`;
						}
					})
				})
			}

			nameFilter = item.name.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[ ]/g, "-");
			templateCards += `
		<article class="card">
				<div class="row row-left">
					<a href="/course/?id=${item.id}">
					 <img src="${item.img[0] ? item.img[1] : ''}" alt="${item.name}" />
					</a>
					<div class="tags">
						${templateTags}
					</div>
				</div>
				<div class="row row-rigth">
					<a href="/course/?id=${item.id}">
						<h2 class="card-title">${item.name}</h2>
						<p class="card-description">${item.description}</p>
					</a>
				</div>
		</article>
		`;
			templateTags = "";

		}

	})
	if (data.length != 0) {
		document.querySelector(".search-counter").innerHTML = `
				<p>Se encontraron ${data.length} resultados</p>
		`;
		document.querySelector(".cards").innerHTML = templateCards;
	} else {
		document.querySelector(".search-counter").innerHTML = `
				<p>Se encontraron ${data.length} resultados</p>
		`;
		document.querySelector(".cards").innerHTML = `
		<div class="error">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
				<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
				<path d="M12 14c-3 0-4 3-4 3h8s-1-3-4-3zm-2.439-2.439c.014-.014.023-.03.037-.044l1.031.413.742-1.857-5-2-.742 1.856 1.373.549L7 10.5a1.499 1.499 0 0 0 2.561 1.061zm3.068-1.49.742 1.857 1.037-.415c.011.011.019.024.029.035a1.488 1.488 0 0 0 2.112 0c.271-.271.438-.644.438-1.056l-.001-.01 1.386-.554-.742-1.857-5.001 2z"></path>
			</svg>
			<p>
				Ohh, por un demonio lo que faltaba.
				<br />
				No se encontraron resultados
			</p>
		</div>
		`;
	}
}





export { getTags, handleCards };