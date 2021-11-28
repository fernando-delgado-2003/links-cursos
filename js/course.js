let params = new URLSearchParams(location.search),
	id = params.get('id'),
	allTags = null,
	templateTags= "";

getTags()
	.then((res) => {
		localStorage.setItem("tags", JSON.stringify(res))
		allTags = res;
	})


fetch("../js/data/cursos.json")
	.then(data => data.json())
	.then(res => {
		allTags = allTags == null ? JSON.parse(localStorage.getItem("tags")) : allTags;

		let resFilter = res.filter(curse => curse.id == id);
		if (allTags != null) {
			resFilter[0].idTags.forEach((id) => {
				allTags.forEach((tag) => {
					if (id == tag.id) {
						templateTags += `<a href="/search/?id=${tag.id}" style="background: ${tag.color};">${tag.tag}</a>`;
					}
				})
			})
		}

		document.querySelector("main").innerHTML = `
		<div class="course">
			<img src="${resFilter[0]["img"][1]}" alt="" />
			<div class="tags">
			${templateTags}
			</div>
			<h1>${resFilter[0].name}</h1>
			<p>${resFilter[0].description}</p>
			<div class="links">
			${
				resFilter[0]["link_drive"] != "" ?
				`			
				<a href="${resFilter[0]["link_drive"]}">
					<img src="../logos/drive.png" alt="" />
				</a>
				`
				:
				""
			}
			${
				resFilter[0]["link_mega"] !="" ? 
				`
				<a href="${resFilter[0]["link_mega"]}">
					<div class="logo-container-mega">
						<img src="../logos/mega.png" alt="" />
					</div>
				</a>

				`
				:
				""
			}
			</div>
		</div>
	`;
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