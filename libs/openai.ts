import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    organization: "org-y5gTvtcDunrUAeOjy87wWPrZ",
    apiKey: "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",
});

delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration);

export default openai;