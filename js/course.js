import { handleCards, getTags } from './module/module.js'

let params = new URLSearchParams(location.search),
	id = params.get('id'),
	allTags = null,
	templateTags = "";
id == null ? location.href = "../" : "";

fetch("../js/data/cursos.json")
	.then(data => data.json())
	.then(res => {
		handleAside(res)
		allTags = allTags == null ? JSON.parse(localStorage.getItem("tags")) : allTags;

		let resFilter = res.filter(curse => curse.id == id),
			idTagsCourse = "";
		resFilter.length == 0 ? location.href = "../" : "";
		if (allTags != null) {
			idTagsCourse = resFilter[0].idTags.filter((id) => {
				for (let i = 0; i < allTags.length; i++) {
					if (id == allTags[i].id) {
						templateTags += `<a href="/search/?id=${allTags[i].id}" style="background: ${allTags[i].color};">${allTags[i].tag}</a>`;
						return true

					}
				}
			})
		}
// GENERAMOS UN NUMERO ALEATORIO EN BASE AL LARGO DE TAGS QUE TIENE EL CURSO
/*	
		let indexRandom = generateRandomInt(idTagsCourse.length),
		templateMoreCourse= "",
		filterMoreCourse=[],
		k = 0;
			filterMoreCourse = res.filter((item) => {
				for (let i = 0; i < item.idTags.length; i++) {
					if(item.idTags[i] == idTagsCourse[indexRandom]){
						if(k < idTagsCourse.length){
							k++
									return true
						}
					}
				}
			})
			filterMoreCourse = filterMoreCourse.sort(function() {return Math.random() - 0.5});
		for(let i = 0; i <= idTagsCourse.length-1; i++){
			console.log(filterMoreCourse[i])
			if(filterMoreCourse[i] != undefined){
				
			templateMoreCourse+=`
			${i == 0 ? "<h4>Sugerencias</h4>" : ""}
			<span>
				<a href="./?id=${filterMoreCourse[i].id}">
					${filterMoreCourse[i].name} ${i < idTagsCourse.length-1 ? "," : ""}
				</a>
			</span>
			`;
			}

		}
		*/
		document.querySelector("title").innerHTML = resFilter[0].name;
		let script = document.createElement("script"),
			script2 = document.createElement("script");
		script.src = "https://www.googletagmanager.com/gtag/js?id=G-WYZCGRY9JV"
		script.async = "true";
		script2.type = "text/javascript";
		script2.text = `
			window.dataLayer = window.dataLayer || [];
  		function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
  		gtag('config', 'G-WYZCGRY9JV');
  `;

		document.getElementsByTagName('head')[0].appendChild(script)
		document.getElementsByTagName('head')[0].appendChild(script2)
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
				<a href="${resFilter[0]["link_drive"]}"  target="_blank">
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
			<div class="wrap-social-media">
				<a href="https://www.facebook.com/sharer.php?u=https://wfrg.vercel.app/${resFilter[0].slug}.html" class="facebook">
					<i class='bx bxl-facebook'></i>
				</a>
				<a href="https://api.whatsapp.com/send?text=https://wfrg.vercel.app/${resFilter[0].slug}.html" class="whatsapp">
					<i class='bx bxl-whatsapp' ></i>
				</a>
			</div>
		</div>
	<div class="banner">
			<!--Inicie el código de rollercoin.com-->
					<a href="https://bit.ly/rollercoin-crypto">
						<img src="//rollercoin.com/static/img/public_img/gen2/w300h250.gif" />
					</a>
					<!--Fin del código de rollercoin.com-->
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

function handleMoreCourses(data) {

}