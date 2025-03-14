const supabaseLink = "https://olwpjsgrbwvomrqcarfr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sd3Bqc2dyYnd2b21ycWNhcmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTgxNjEsImV4cCI6MjA1NzM3NDE2MX0.Xs-Dm4yC8rL-3bN4-JfZ3lPGGifORohVYtaO1N80mmA";

const supabasePublicClient = supabase.createClient( supabaseLink, supabaseKey ,
    {
        db: {
            schema: "public"
        }
    });
