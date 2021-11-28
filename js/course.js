import { handleCards, getTags } from './module/module.js'

let params = new URLSearchParams(location.search),
	id = params.get('id'),
	allTags = null,
	templateTags = "";
			id == null? location.href = "../" : "";

fetch("../js/data/cursos.json")
	.then(data => data.json())
	.then(res => {
		handleAside(res)
		allTags = allTags == null ? JSON.parse(localStorage.getItem("tags")) : allTags;

		let resFilter = res.filter(curse => curse.id == id);
		resFilter.length == 0 ? location.href="../" : "";
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
					<span>Descargar en Drive</span>
				</a>
				`
				:
				""
			}
			${
				resFilter[0]["link_mega"] !="" ? 
				`
				<a href="${resFilter[0]["link_mega"]}">
						<img src="../logos/mega.png" alt="" />
				</a>

				`
				:
				""
			}
			</div>
		</div>
	`;

		let intRandom = [],
			intervalo = res.length,
			max = 6;
		for (let i = 0; intRandom.length <= intervalo - 1; i++) {
			let intGenerate = generateRandomInt(intervalo);
			if (intRandom.length < max) {

				if (!intRandom.some(int => int == intGenerate)) {
					intRandom.push(intGenerate)
				}
			} else {
				intervalo = max
			}
		}
		let dataFilterCards = [];
		for (let i = 0; i < res.length; i++) {
			for (let k = 0; k < intRandom.length; k++) {
				if (i == intRandom[k]) {
dataFilterCards.push(res[i])
				}
			}
		}
handleCards(dataFilterCards)




	})

function handleAside(data) {
	let templateFav = "";
	let fav = data.filter(curse => curse.fav);
	for (let i = 0; i < fav.length; i++) {
		templateFav += `
				<li><a href="/course/?id=${fav[i].id}">${fav[i].name}</a></li>
		`;
	}
	document.querySelector(".wrap-fav").innerHTML = `
			<div class="wrap-title-section">
				<strong>Populares</strong>
			</div>
			<ul>
			</ul>
	`;
	document.querySelector(".wrap-fav ul").innerHTML = templateFav;
}

function generateRandomInt(max) {
	return Math.floor(Math.random() * max);
}