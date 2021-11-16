import { Service } from 'typedi';
import * as textToSpeech from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as util from 'util';

@Service()
export class TtsService {
  async getAudioFromTTS(textToSearch: string) {
    const credentials = {
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    };

    const client = new textToSpeech.TextToSpeechClient({ credentials });
    const MP3 = 2;

    const request = {
      input: { text: textToSearch },
      voice: { languageCode: 'pl-PL' },
      audioConfig: { audioEncoding: MP3 },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  }
}
