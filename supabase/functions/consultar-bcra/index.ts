import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { cuit } = await req.json()

    if (!cuit || cuit.length < 10) {
      return new Response(
        JSON.stringify({ error: "CUIT/CUIL inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Consultar API BCRA - Central de Deudores
    const bcraUrl = `https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/${cuit}`
    
    const bcraResponse = await fetch(bcraUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "es-AR,es;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://www.bcra.gob.ar/",
        "Origin": "https://www.bcra.gob.ar",
      },
    })

    if (!bcraResponse.ok) {
      if (bcraResponse.status === 404) {
        return new Response(
          JSON.stringify({ 
            status: "not_found",
            message: "No se encontraron registros para este CUIT/CUIL",
            results: null 
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      }
      
      return new Response(
        JSON.stringify({ 
          error: `Error del BCRA: ${bcraResponse.status}`,
          details: await bcraResponse.text()
        }),
        { status: bcraResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const data = await bcraResponse.json()

    return new Response(
      JSON.stringify({ status: "ok", ...data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
