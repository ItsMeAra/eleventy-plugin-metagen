describe("Validating the meta tags generated by eleventy-plugin-metagen ", () => {
    before(() => {
        cy.visit("../../_site/tests/index.html");
    });

    it("<title> tag is generated and matches", () => {
        cy.title()
            .should("eq", "Eleventy Plugin Meta Generator")
    });

    it("Generic meta tags are generated", () => {
        const identifiers = [
            "charset",
            "http-equiv",
            "viewport",
            "author",
            "title",
            "description"
        ];
        const content = [
            "utf-8",
            "IE=edge",
            "width=device-width, initial-scale=1",
            "Tanner Dolby",
            "Eleventy Plugin Meta Generator",
            "An eleventy shortcode for generating meta tags."
        ];

        identifiers.forEach((id, index) => {
            if (index == 0) {
                cy.get("meta[charset]")
                    .invoke("attr", "charset")
                    .should("eq", "utf-8")
            } else if (index == 1) {
                cy.get("meta[http-equiv]")
                    .invoke("attr", "http-equiv")
                    .should("eq", "X-UA-Compatible")
                cy.get("meta[http-equiv]")
                    .invoke("attr", "content")
                    .should("eq", "IE=edge")
            } else {
                cy.get(`meta[name=${id}]`)
                    .each(el => {
                        cy.get(el)
                            .invoke("attr", "content")
                            .should("eq", content[index])
                    });
            }
        });
    });

    it("Twitter meta tags are generated", () => {
        const identifiers = [
            "card",
            "site",
            "creator",
            "url",
            "title",
            "description",
            "image",
            "image:alt"
        ];

        const content = [
            "summary_large_image",
            "@tannerdolby",
            "@tannerdolby",
            "https://tannerdolby.com",
            "Eleventy Plugin Meta Generator",
            "An eleventy shortcode for generating meta tags.",
            "https://tannerdolby.com/images/arch-spiral-large.jpg",
            "Archimedean Spiral"
        ];

        identifiers.forEach((id, index) => {
            cy.get(`meta[name='twitter:${id}']`)
                .each(el => {
                    cy.get(el)
                        .invoke("attr", "content")
                        .should("eq", content[index]);
                });
                
        });
    });

    it("Open graphs meta tags generated", () => {
        const identifiers = [
            "type",
            "url",
            "locale",
            "title",
            "description",
            "image",
            "image:alt"
        ];
        const content = [
            "website",
            "https://tannerdolby.com",
            "en_US",
            "Eleventy Plugin Meta Generator",
            "An eleventy shortcode for generating meta tags.",
            "https://tannerdolby.com/images/arch-spiral-large.jpg",
            "Archimedean Spiral"
        ];
        identifiers.forEach((id, index) => {
            cy.get(`meta[property='og:${id}']`)
                .each(el => {
                    cy.get(el)
                        .invoke("attr", "content")
                        .should("eq", content[index])
                });
        });
    });

    it("Canonical link generated and matches", () => {
        cy.get("link[rel='canonical']")
            .invoke("attr", "href")
            .should("eq", "https://tannerdolby.com")
    });
});
