let allTags = null;
getTags()
	.then((res) => {
		localStorage.setItem("tags", JSON.stringify(res))
		allTags = res;
	})

function getTags() {
	return new Promise((resolve, reject) => {

		fetch('../js/tags.json')
			.then(res => res.json())
			.then(data => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})

}

function handleCards(data, path) {
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
							templateTags += `<a href="/category/?id=${tag.id}" style="background: ${tag.color};">${tag.tag}</a>`;
						}
					})
				})
			}
			
			nameFilter = item.name.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[ ]/g, "-");
			templateCards += `
		<article class="card">
				<div class="row row-left">
					<a href="course/?q=${nameFilter}">
					 <img src="${item.img[0] ? item.img[1] : ''}" alt="${item.name}" />
					</a>
					<div class="tags">
						${templateTags}
					</div>
				</div>
				<div class="row row-rigth">
					<a href="course/?q=${nameFilter}">
						<h2 class="card-title">${item.name}</h2>
						<p class="card-description">${item.description}</p>
					</a>
				</div>
		</article>
		`;
			templateTags = "";

		}

	})
	document.querySelector(".cards").innerHTML = templateCards;
}





export { getTags, handleCards };