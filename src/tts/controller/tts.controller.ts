// import { Request, Response } from 'express';
import { Body, Post, JsonController } from 'routing-controllers';
import { TtsDto } from '@tts/request/dto/tts.dto';
import { TtsService } from '@tts/service/tts.service';
import { Service } from 'typedi';
@Service()
@JsonController('/tts')
class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post()
  async executeTTS(@Body() data: TtsDto) {
    const url = await this.ttsService.getAudioFromTTS(data.text);
    return { url };
  }
}

export default TtsController;
