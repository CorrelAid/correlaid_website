import { gen_img_url } from "$lib/js/helpers";
import directus_fetch from '$lib/js/directus_fetch'

export const GET = async ({ params }) => {


  const query = `
    query {
      Documents(filter:{translations:{slug:{_eq: "${params.slug}"}}}){
          translations(filter: { languages_code: { code: {_eq : "${get_lang(params)}"}}}{
              document{
                  id
              }
          }
      }
}
`

  const data = await directus_fetch(query)

  const file_id = data.Documents[0].translations[0].document.id
  const file_name = gen_img_url(file_id)

  // redirecting the user to the desired file hosted on directus
  return new Response('Redirect', {status: 303, headers: { Location: file_name }})

}