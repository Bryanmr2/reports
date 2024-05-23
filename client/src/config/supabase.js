import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://itfqiymlthrhexiqlpmo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZnFpeW1sdGhyaGV4aXFscG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MjM5MTMsImV4cCI6MjAzMTQ5OTkxM30.ahx-O-7BgrMEpWsv1UCrsTHz0eWsts_osYoQ1QU36mQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
