document.addEventListener("DOMContentLoaded", function () {
    const API_URL = '/api/site-data';

    const defaultData = {
        logo_img: "LOGO1.png",
        logo_size: "55",
        logo_texto_1: "MCP",
        logo_texto_2: "Construções",
        logo_sub: "Engenharia e Obras",
        slide1_tit1: "Construção Civil",
        slide1_tit2: "de Alto Padrão",
        slide1_sub: "Mais de 15 anos construindo o futuro com excelência.",
        slide1_img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
        slide2_tit1: "Obras Residenciais",
        slide2_tit2: "e Comerciais",
        slide2_img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
        slide3_tit1: "Reformas e",
        slide3_tit2: "Ampliações",
        slide3_img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
        slide4_tit1: "Galpões e",
        slide4_tit2: "Construção Industrial",
        slide4_img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
        stats_text: "NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.",
        serv_tit1: "Construção Residencial",
        serv_txt1: "A MCP Construções é especializada em obras residenciais de alto padrão. Trabalhamos com materiais de primeira linha e profissionais qualificados para entregar a casa dos seus sonhos.",
        serv_img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",
        serv_tit2: "Obras Comerciais e Industriais",
        serv_txt2: "Galpões, lojas, escritórios e estruturas industriais prontos para o seu negócio. Projetos sob medida com eficiência e qualidade.",
        serv_img2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
        proj_tit: "PROJETOS RECENTES",
        proj1_nome: "Residencial Vila Nova",
        proj1_img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
        proj2_nome: "Centro Empresarial",
        proj2_img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
        proj3_nome: "Muro de Arrimo",
        proj3_img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
        proj4_nome: "Projeto Comercial",
        proj4_img: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&q=80",
        sobre_tit: "Sobre Nós",
        sobre_txt: "A MCP Construções nasceu da paixão por transformar projetos em realidade. Com mais de 15 anos de experiência no mercado da construção civil, nos consolidamos como referência em qualidade, compromisso e inovação. Nossa equipe é formada por profissionais altamente qualificados, prontos para atender às suas necessidades com excelência.",
        sobre_img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
        cta_tit: "NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.",
        cta_sub: "Estamos sempre empenhados em ajudar nossos clientes em cada projeto.",
        cta_img: "wp-content/themes/nobislux/images/bg-01.jpg",
        contato_end: "Lisboa — Portugal",
        contato_tel: "+351 934 627 192",
        contato_email: "contato@mcpconstrucoes.pt",
        contato_hr: "Seg–Sex: 08h às 18h",
        footer_desc: "Mais de 15 anos entregando obras com qualidade, prazo e compromisso."
    };

    const defaultPortfolio = [
        { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", nome: "Residencial Vila Nova", categoria: "RESIDENCIAL" },
        { img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", nome: "Centro Empresarial Horizonte", categoria: "COMERCIAL" },
        { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", nome: "Galpão Logístico LP-12", categoria: "INDUSTRIAL" },
        { img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", nome: "Casa Alto Padrão SP", categoria: "RESIDENCIAL, REFORMA" },
        { img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80", nome: "Escritório Corporativo Premium", categoria: "COMERCIAL, ACABAMENTO" },
        { img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", nome: "Reforma Completa Campinas", categoria: "REFORMA, ACABAMENTO" },
        { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", nome: "Condomínio Residencial Guarulhos", categoria: "RESIDENCIAL" },
        { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", nome: "Complexo Industrial ABC", categoria: "INDUSTRIAL" },
        { img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80", nome: "Acabamento Residencial", categoria: "ACABAMENTO" },
        { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", nome: "Loja Shopping Center", categoria: "COMERCIAL" },
        { img: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80", nome: "Reforma Comercial SP", categoria: "REFORMA" },
        { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", nome: "Apartamento Alto Padrão", categoria: "RESIDENCIAL, ACABAMENTO" }
    ];

    function setHtml(selector, text) {
        const el = document.querySelector(selector);
        if (el && text !== undefined) el.innerHTML = text;
    }

    function applyContent(md, portData) {
        const headerLogo = document.querySelector('.logo img');
        if (headerLogo) {
            if (md.logo_img) headerLogo.src = md.logo_img;
            if (md.logo_size) {
                headerLogo.style.maxHeight = md.logo_size + "px";
                headerLogo.style.width = "auto";
                headerLogo.style.maxWidth = "none";
            }
        }

        const footerLogo = document.querySelector('footer .col:nth-child(1) img');
        if (footerLogo) {
            if (md.logo_img) footerLogo.src = md.logo_img;
            if (md.logo_size) {
                const footerSize = Math.max(20, md.logo_size - 10);
                footerLogo.style.maxHeight = footerSize + "px";
                footerLogo.style.width = "auto";
                footerLogo.style.maxWidth = "none";
            }
        }

        const footerLogo = document.querySelector('footer .col:nth-child(1) img');
        if (footerLogo) {
            if (md.logo_img) footerLogo.src = md.logo_img;
            if (md.logo_size) footerLogo.style.maxHeight = (Math.max(20, md.logo_size - 10)) + "px";
        }

        const slides = document.querySelectorAll('#section-1 .slide');
        if (slides.length >= 4) {
            slides[0].querySelector('h1').innerHTML = md.slide1_tit1 + '<br><span style="color:#c8a96e;">' + md.slide1_tit2 + '</span>';
            if (slides[0].querySelector('p')) slides[0].querySelector('p').innerHTML = md.slide1_sub;
            if (md.slide1_img) slides[0].style.backgroundImage = 'url(' + md.slide1_img + ')';

            slides[1].querySelector('h1').innerHTML = md.slide2_tit1 + '<br>' + md.slide2_tit2;
            if (md.slide2_img) slides[1].style.backgroundImage = 'url(' + md.slide2_img + ')';

            slides[2].querySelector('h1').innerHTML = md.slide3_tit1 + '<br>' + md.slide3_tit2;
            if (md.slide3_img) slides[2].style.backgroundImage = 'url(' + md.slide3_img + ')';

            slides[3].querySelector('h1').innerHTML = md.slide4_tit1 + '<br>' + md.slide4_tit2;
            if (md.slide4_img) slides[3].style.backgroundImage = 'url(' + md.slide4_img + ')';
        }

        setHtml('.typing-txt', md.stats_text);

        const servRows = document.querySelectorAll('#section-2 .row');
        if (servRows.length >= 2) {
            const s1Tit = servRows[0].querySelector('h3');
            if (s1Tit) s1Tit.innerText = md.serv_tit1;
            const s1Txt = servRows[0].querySelector('.text-wrapper');
            if (s1Txt) s1Txt.innerHTML = md.serv_txt1;
            const s1Img = servRows[0].querySelector('img');
            if (s1Img && md.serv_img1) s1Img.src = md.serv_img1;

            const s2Tit = servRows[1].querySelector('h3');
            if (s2Tit) s2Tit.innerText = md.serv_tit2;
            const s2Txt = servRows[1].querySelector('.text-wrapper');
            if (s2Txt) s2Txt.innerHTML = md.serv_txt2;
            const s2Img = servRows[1].querySelector('img');
            if (s2Img && md.serv_img2) s2Img.src = md.serv_img2;
        }

        const portGrid = document.querySelector('#section-4 .grid');
        if (portGrid) {
            portGrid.innerHTML = '';
            let gridHtml = '';
            portData.forEach(item => {
                const catClasses = item.categoria.split(',').map(c => 'filter-' + c.trim().substring(0, 3).toLowerCase()).join(' ');
                gridHtml += '<div class="grid-item ' + catClasses + '">' +
                    '<a href="#" class="project-item">' +
                    '<div class="bg-img" style="background-image:url(' + (item.img || '') + ')">' +
                    '<img src="' + (item.img || '') + '" data-src="' + (item.img || '') + '" alt="' + (item.nome || '') + '" class="hidden">' +
                    '</div>' +
                    '<div class="holder"><span class="ttl">' + (item.categoria || '') + '</span><span>' + (item.nome || '') + '</span></div>' +
                    '</a></div>';
            });
            portGrid.innerHTML = gridHtml;
            setTimeout(() => {
                if (window.jQuery && jQuery().isotope) {
                    jQuery(portGrid).isotope('reloadItems').isotope({ filter: '*' });
                }
            }, 300);
        }

        const sobreTit = document.querySelector('#section-5 h3');
        if (sobreTit) sobreTit.innerText = md.sobre_tit;
        const sobreTxt = document.querySelector('#section-5 .text-wrapper');
        if (sobreTxt) sobreTxt.innerHTML = md.sobre_txt;
        const sobreImg = document.querySelector('#section-5 img');
        if (sobreImg && md.sobre_img) sobreImg.src = md.sobre_img;

        const infoItems = document.querySelectorAll('.c-info-item div');
        if (infoItems.length >= 4) {
            setHtml('.c-info-item:nth-child(1) p', md.contato_end);
            const telEl = document.querySelector('.c-info-item:nth-child(2) a');
            if (telEl) { telEl.innerText = md.contato_tel; telEl.href = 'tel:' + md.contato_tel.replace(/\D/g, ''); }
            const mailEl = document.querySelector('.c-info-item:nth-child(3) a');
            if (mailEl) { mailEl.innerText = md.contato_email; mailEl.href = 'mailto:' + md.contato_email; }
            setHtml('.c-info-item:nth-child(4) p', md.contato_hr);
        }

        setHtml('footer .col:nth-child(1) p', md.footer_desc);
        const footTel = document.querySelector('footer .col:nth-child(3) p:nth-of-type(1) a');
        if (footTel) { footTel.innerText = md.contato_tel; footTel.href = 'tel:' + md.contato_tel.replace(/\D/g, ''); }
        const footMail = document.querySelector('footer .col:nth-child(3) p:nth-of-type(2) a');
        if (footMail) { footMail.innerText = md.contato_email; footMail.href = 'mailto:' + md.contato_email; }
        setHtml('footer .col:nth-child(3) p:nth-of-type(3)', md.contato_hr);
        setHtml('footer .col:nth-child(2)', '<h4>LOCALIZAÇÃO</h4>' + md.contato_end.replace(' — ', '<br>'));

        const ctaSec = document.querySelector('#section-6');
        if (ctaSec) {
            setHtml('#section-6 h2', md.cta_tit);
            setHtml('#section-6 p', md.cta_sub);
            if (md.cta_img) {
                if (md.cta_img.startsWith('data:') || md.cta_img.startsWith('http')) {
                    ctaSec.style.backgroundImage = "url('" + md.cta_img + "')";
                } else {
                    ctaSec.style.backgroundImage = "url('" + md.cta_img + "')";
                }
            }
        }

        const projSec = document.querySelector('#section-3');
        if (projSec) {
            const projTit = projSec.querySelector('h3');
            if (projTit) projTit.innerText = md.proj_tit || 'PROJETOS RECENTES';
            for (let i = 1; i <= 4; i++) {
                const projImg = projSec.querySelector('.video-box:nth-child(' + i + ') img');
                const savedProjImg = md['proj' + i + '_img'];
                if (projImg && savedProjImg) projImg.src = savedProjImg;
            }
        }

        setTimeout(() => {
            if (window.jQuery && jQuery().isotope) {
                jQuery('#section-4 .grid').isotope('layout');
            }
        }, 1000);
    }

    fetch(API_URL)
        .then(r => r.json())
        .then(({ config, portfolio }) => {
            const md = config && Object.keys(config).length > 0 ? { ...defaultData, ...config } : defaultData;
            const portData = portfolio && Array.isArray(portfolio) && portfolio.length > 0 ? portfolio : defaultPortfolio;
            applyContent(md, portData);
        })
        .catch(e => {
            console.error('Erro ao carregar dados da API, usando padrão:', e);
            applyContent(defaultData, defaultPortfolio);
        });
});
