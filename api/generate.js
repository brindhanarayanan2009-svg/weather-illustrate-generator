export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { weather } = req.body;

        if (!weather || !weather.trim()) {
            return res.status(400).json({
                error: "Weather description is required"
            });
        }

        // AI integration will be connected here.
        // Keep the API key on the server, never inside script.js.

        return res.status(200).json({
            message: "Backend is working!",
            weather: weather
        });

    } catch (error) {
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}
