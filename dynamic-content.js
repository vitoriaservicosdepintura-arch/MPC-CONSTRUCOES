(function () {
    var API_URL = 'https://mpc-construcoes.vercel.app/api/site-data';

    var defaultData = {
        logo_img: 'LOGO1.png',
        logo_size: '55',
        logo_texto_1: 'MCP',
        logo_texto_2: 'Construções',
        logo_sub: 'Engenharia e Obras',
        slide1_tit1: 'Construção Civil',
        slide1_tit2: 'de Alto Padrão',
        slide1_sub: 'Mais de 15 anos construindo o futuro com excelência.',
        slide1_img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80',
        slide2_tit1: 'Obras Residenciais',
        slide2_tit2: 'e Comerciais',
        slide2_img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80',
        slide3_tit1: 'Reformas e',
        slide3_tit2: 'Ampliações',
        slide3_img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
        slide4_tit1: 'Galpões e',
        slide4_tit2: 'Construção Industrial',
        slide4_img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
        slide5_tit1: 'Qualidade e',
        slide5_tit2: 'Compromisso',
        slide5_img: 'https://images.unsplash.com/photo-1541888946425-f8fb40cf4e7e?w=1600&q=80',
        stats_text: 'NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.',
        serv_tit1: 'Construção Residencial',
        serv_txt1: 'A MCP Construções é especializada em obras residenciais de alto padrão. Trabalhamos com materiais de primeira linha e profissionais qualificados para entregar a casa dos seus sonhos.',
        serv_img1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
        serv_tit2: 'Obras Comerciais e Industriais',
        serv_txt2: 'Galpões, lojas, escritórios e estruturas industriais prontos para o seu negócio. Projetos sob medida com eficiência e qualidade.',
        serv_img2: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80',
        proj_tit: 'PROJETOS RECENTES',
        proj1_nome: 'Residencial Vila Nova',
        proj1_img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
        proj2_nome: 'Centro Empresarial',
        proj2_img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
        proj3_nome: 'Muro de Arrimo',
        proj3_img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
        proj4_nome: 'Projeto Comercial',
        proj4_img: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&q=80',
        sobre_tit: 'Sobre Nós',
        sobre_txt: 'A MCP Construções nasceu da paixão por transformar projetos em realidade. Com mais de 15 anos de experiência no mercado da construção civil, nos consolidamos como referência em qualidade, compromisso e inovação. Nossa equipe é formada por profissionais altamente qualificados, prontos para atender às suas necessidades com excelência.',
        sobre_img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80',
        cta_tit: 'NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.',
        cta_sub: 'Estamos sempre empenhados em ajudar nossos clientes em cada projeto.',
        cta_img: 'wp-content/themes/nobislux/images/bg-01.jpg',
        contato_end: 'Lisboa — Portugal',
        contato_tel: '+351 934 627 192',
        contato_email: 'contato@mcpconstrucoes.pt',
        contato_hr: 'Seg–Sex: 08h às 18h',
        footer_desc: 'Mais de 15 anos entregando obras com qualidade, prazo e compromisso.',
        card1_tit: 'Construção Residencial', card1_txt: 'Casas, apartamentos e condomínios com acabamento de alto padrão e projetos personalizados.',
        card2_tit: 'Reformas e Ampliações', card2_txt: 'Reformas completas com planejamento detalhado e execução eficiente para transformar seu espaço.',
        card3_tit: 'Construção Comercial', card3_txt: 'Galpões, lojas e escritórios prontos para o seu negócio, focando em funcionalidade e design.',
        card4_tit: 'Acabamento e Pintura', card4_txt: 'Pintura interna, externa e revestimentos decorativos com materiais de primeiríssima qualidade.',
        card5_tit: 'Instalações Elétricas e Hidráulicas', card5_txt: 'Projetos e manutenção com materiais certificados e profissionais altamente qualificados.',
        card6_tit: 'Projetos e Consultoria', card6_txt: 'Acompanhamento técnico especializado do projeto à entrega final da obra.'
    };

    var defaultPortfolio = [
        { img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', nome: 'Residencial Vila Nova', categoria: 'RESIDENCIAL' },
        { img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', nome: 'Centro Empresarial Horizonte', categoria: 'COMERCIAL' },
        { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', nome: 'Galpão Logístico LP-12', categoria: 'INDUSTRIAL' },
        { img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', nome: 'Casa Alto Padrão SP', categoria: 'RESIDENCIAL, REFORMA' },
        { img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80', nome: 'Escritório Corporativo Premium', categoria: 'COMERCIAL, ACABAMENTO' },
        { img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80', nome: 'Reforma Completa Campinas', categoria: 'REFORMA, ACABAMENTO' },
        { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', nome: 'Condomínio Residencial Guarulhos', categoria: 'RESIDENCIAL' },
        { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', nome: 'Complexo Industrial ABC', categoria: 'INDUSTRIAL' },
        { img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80', nome: 'Acabamento Residencial', categoria: 'ACABAMENTO' },
        { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', nome: 'Loja Shopping Center', categoria: 'COMERCIAL' },
        { img: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80', nome: 'Reforma Comercial SP', categoria: 'REFORMA' },
        { img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', nome: 'Apartamento Alto Padrão', categoria: 'RESIDENCIAL, ACABAMENTO' }
    ];

    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return document.querySelectorAll(sel); }
    function setHtml(sel, txt) { var el = $(sel); if (el && txt !== undefined) el.innerHTML = txt; }

    function apply(md, portData) {
        var headerLogo = $('.logo img');
        if (headerLogo) {
            if (md.logo_img) headerLogo.src = md.logo_img;
            if (md.logo_size) {
                headerLogo.style.maxHeight = md.logo_size + 'px';
                headerLogo.style.width = 'auto';
                headerLogo.style.maxWidth = 'none';
            }
        }

        var footerLogo = $('footer .col:nth-child(1) img');
        if (footerLogo) {
            if (md.logo_img) footerLogo.src = md.logo_img;
            if (md.logo_size) {
                var fs = Math.max(20, parseInt(md.logo_size) - 10);
                footerLogo.style.maxHeight = fs + 'px';
                footerLogo.style.width = 'auto';
                footerLogo.style.maxWidth = 'none';
            }
        }

        var slides = $$('#section-1 .slide');
        if (slides.length >= 5) {
            slides[0].querySelector('h1').innerHTML = md.slide1_tit1 + '<br><span style="color:#c8a96e;">' + md.slide1_tit2 + '</span>';
            var s0p = slides[0].querySelector('p');
            if (s0p) s0p.innerHTML = md.slide1_sub;
            if (md.slide1_img) slides[0].style.backgroundImage = 'url(' + md.slide1_img + ')';

            slides[1].querySelector('h1').innerHTML = md.slide2_tit1 + '<br>' + md.slide2_tit2;
            if (md.slide2_img) slides[1].style.backgroundImage = 'url(' + md.slide2_img + ')';

            slides[2].querySelector('h1').innerHTML = md.slide3_tit1 + '<br>' + md.slide3_tit2;
            if (md.slide3_img) slides[2].style.backgroundImage = 'url(' + md.slide3_img + ')';

            slides[3].querySelector('h1').innerHTML = md.slide4_tit1 + '<br>' + md.slide4_tit2;
            if (md.slide4_img) slides[3].style.backgroundImage = 'url(' + md.slide4_img + ')';

            slides[4].querySelector('h1').innerHTML = md.slide5_tit1 + '<br>' + md.slide5_tit2;
            if (md.slide5_img) slides[4].style.backgroundImage = 'url(' + md.slide5_img + ')';

            var allSlideImgs = $$('#section-1 .slide img');
            if (md.slide1_img && allSlideImgs[0]) allSlideImgs[0].src = md.slide1_img;
            if (md.slide2_img && allSlideImgs[1]) allSlideImgs[1].src = md.slide2_img;
            if (md.slide3_img && allSlideImgs[2]) allSlideImgs[2].src = md.slide3_img;
            if (md.slide4_img && allSlideImgs[3]) allSlideImgs[3].src = md.slide4_img;
            if (md.slide5_img && allSlideImgs[4]) allSlideImgs[4].src = md.slide5_img;

            if (window.jQuery) {
                var imgs = [md.slide1_img, md.slide2_img, md.slide3_img, md.slide4_img, md.slide5_img];
                var numSlides = 5;
                jQuery('#section-1 .slick-slide').each(function() {
                    var idx = parseInt(jQuery(this).attr('data-slick-index'));
                    if (!isNaN(idx)) {
                        while (idx < 0) idx += numSlides;
                        var mappedIdx = idx % numSlides;
                        if (imgs[mappedIdx]) {
                            jQuery(this).find('.bg-img').css('background-image', 'url(' + imgs[mappedIdx] + ')');
                            jQuery(this).find('img').attr('src', imgs[mappedIdx]);
                        }
                    }
                });
            }
        }

        setHtml('.typing-txt', md.stats_text);

        var servRows = $$('#section-2 .row');
        if (servRows.length >= 2) {
            var s1t = servRows[0].querySelector('h3'); if (s1t) s1t.innerText = md.serv_tit1;
            var s1x = servRows[0].querySelector('.text-wrapper'); if (s1x) s1x.innerHTML = md.serv_txt1;
            var s1i = servRows[0].querySelector('img'); if (s1i && md.serv_img1) s1i.src = md.serv_img1;

            var s2t = servRows[1].querySelector('h3'); if (s2t) s2t.innerText = md.serv_tit2;
            var s2x = servRows[1].querySelector('.text-wrapper'); if (s2x) s2x.innerHTML = md.serv_txt2;
            var s2i = servRows[1].querySelector('img'); if (s2i && md.serv_img2) s2i.src = md.serv_img2;
        }

        var portGrid = $('#section-4 .grid');
        if (portGrid) {
            var html = '';
            for (var pi = 0; pi < portData.length; pi++) {
                var item = portData[pi];
                var cats = item.categoria.split(',').map(function(c) { return 'filter-' + c.trim().substring(0, 3).toLowerCase(); }).join(' ');
                html += '<div class="grid-item ' + cats + '">';
                html += '<a href="#" class="project-item">';
                html += '<div class="bg-img" style="background-image:url(' + (item.img || '') + ')">';
                html += '<img src="' + (item.img || '') + '" data-src="' + (item.img || '') + '" alt="' + (item.nome || '') + '" class="hidden">';
                html += '</div>';
                html += '<div class="holder"><span class="ttl">' + (item.categoria || '') + '</span><span>' + (item.nome || '') + '</span></div>';
                html += '</a></div>';
            }
            portGrid.innerHTML = html;
            setTimeout(function() {
                if (window.jQuery && jQuery().isotope) {
                    jQuery(portGrid).isotope('reloadItems').isotope({ filter: '*' });
                }
            }, 300);
        }

        var sobreTit = $('#section-5 h3'); if (sobreTit) sobreTit.innerText = md.sobre_tit;
        var sobreTxt = $('#section-5 .text-wrapper'); if (sobreTxt) sobreTxt.innerHTML = md.sobre_txt;
        var sobreImg = $('#section-5 img'); if (sobreImg && md.sobre_img) sobreImg.src = md.sobre_img;

        var infoItems = $$('.c-info-item div');
        if (infoItems.length >= 4) {
            setHtml('.c-info-item:nth-child(1) p', md.contato_end);
            var telEl = $('.c-info-item:nth-child(2) a');
            if (telEl) { telEl.innerText = md.contato_tel; telEl.href = 'tel:' + md.contato_tel.replace(/\D/g, ''); }
            var mailEl = $('.c-info-item:nth-child(3) a');
            if (mailEl) { mailEl.innerText = md.contato_email; mailEl.href = 'mailto:' + md.contato_email; }
            setHtml('.c-info-item:nth-child(4) p', md.contato_hr);
        }

        setHtml('footer .col:nth-child(1) p', md.footer_desc);
        var ft = $('footer .col:nth-child(3) p:nth-of-type(1) a');
        if (ft) { ft.innerText = md.contato_tel; ft.href = 'tel:' + md.contato_tel.replace(/\D/g, ''); }
        var fm = $('footer .col:nth-child(3) p:nth-of-type(2) a');
        if (fm) { fm.innerText = md.contato_email; fm.href = 'mailto:' + md.contato_email; }
        setHtml('footer .col:nth-child(3) p:nth-of-type(3)', md.contato_hr);
        setHtml('footer .col:nth-child(2)', '<h4>LOCALIZAÇÃO</h4>' + md.contato_end.replace(' — ', '<br>'));

        var ctaSec = $('#section-6');
        if (ctaSec) {
            setHtml('#section-6 h2', md.cta_tit);
            setHtml('#section-6 p', md.cta_sub);
            if (md.cta_img) ctaSec.style.backgroundImage = "url('" + md.cta_img + "')";
        }

        var projSec = $('#section-3');
        if (projSec) {
            var pt = projSec.querySelector('h3');
            if (pt) pt.innerText = md.proj_tit || 'PROJETOS RECENTES';
            for (var i = 1; i <= 4; i++) {
                var pi = projSec.querySelector('.video-box:nth-child(' + i + ') img');
                var si = md['proj' + i + '_img'];
                if (pi && si) pi.src = si;
            }
        }

        var svcCards = $$('#section-2 .svc-card');
        if (svcCards.length >= 6) {
            for (var c = 1; c <= 6; c++) {
                var card = svcCards[c - 1];
                var h4 = card.querySelector('h4');
                var p = card.querySelector('p');
                if (h4 && md['card' + c + '_tit']) h4.innerText = md['card' + c + '_tit'];
                if (p && md['card' + c + '_txt']) p.innerHTML = md['card' + c + '_txt'];
            }
        }

        setTimeout(function() {
            if (window.jQuery && jQuery().isotope) {
                jQuery('#section-4 .grid').isotope('layout');
            }
        }, 1000);
    }

    fetch(API_URL)
        .then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(function(result) {
            var cfg = result.config || {};
            var port = result.portfolio || [];
            var md = Object.keys(cfg).length > 0 ? Object.assign({}, defaultData, cfg) : defaultData;
            var pd = Array.isArray(port) && port.length > 0 ? port : defaultPortfolio;
            apply(md, pd);
        })
        .catch(function(e) {
            console.error('API fetch failed, using defaults:', e);
            apply(defaultData, defaultPortfolio);
        });
})();
