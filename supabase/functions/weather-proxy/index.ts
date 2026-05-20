import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const { city, units } = await req.json();

    if (!city?.trim()) {
      return new Response(JSON.stringify({ message: "City is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("OPENWEATHERMAP_API_KEY");
    const unit = units === "imperial" ? "imperial" : "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}&lang=en`;

    const owmRes = await fetch(url);
    const owmData = await owmRes.json();

    if (!owmRes.ok) {
      return new Response(
        JSON.stringify({ message: owmData.message ?? "API error" }),
        {
          status: owmRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const payload = {
      cityName: owmData.name,
      country: owmData.sys.country,
      temp: owmData.main.temp,
      feelsLike: owmData.main.feels_like,
      humidity: owmData.main.humidity,
      description: owmData.weather[0].description,
      iconCode: owmData.weather[0].icon,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err instanceof Error ? err.message : "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
