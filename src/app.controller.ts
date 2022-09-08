import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/getToken')
  getToken(
    @Body('senderUserName') senderUserName: string,
    @Body('reciverUserName') reciverUserName: string
  ) {
    const roomName = uuidv4();
    const senderToken = this.appService.getToken(senderUserName, roomName);
    const reciverToken = this.appService.getToken(reciverUserName, roomName);
    return {
      senderToken: senderToken,
      reciverToken: reciverToken
    };
  }

  @Get('/rooms')
  async getRoomList() {
    try {
      return {
        Rooms: await this.appService.getRoomList()
      };
    } catch (error) {
      console.log('Error :', error);
    }
  }

  @Post('/createRoom')
  createRoom(@Body('roomName') roomName: string) {
    this.appService.createRoom(roomName);
    return {
      message: 'Successfully create room'
    };
  }
}
