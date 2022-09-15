import { Injectable } from '@nestjs/common';
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class AppService {
  private apikey = 'APIE4pAgorykoBS';
  private secretkey = 'oatsORZL78l49EHAcnOyEfMr7Dw9eetX1DZD1YuD1jdB';
  private livekitHost = 'https://livekit.creole.tech';

  getHello(): string {
    return 'Hello World!';
  }
  getToken(participantName: string, roomName: string): string {
    const at = new AccessToken(this.apikey, this.secretkey, {
      identity: participantName
    });
    at.addGrant({
      roomJoin: true,
      room: roomName,
      // canPublish: true,
      // canSubscribe: true,
      // roomCreate: true,
      // roomList: true,
      // roomAdmin: true,
      // roomRecord: true,
      // canPublishData: true,
      // recorder: true
    });
    return at.toJwt();
  }

  async getRoomList() {
    try {
      const svc = new RoomServiceClient(
        this.livekitHost,
        this.apikey,
        this.secretkey
      );
      return await svc.listRooms();
    } catch (err) {
      console.log('Error :', err);
    }
  }
  async createRoom(roomName: string) {
    const opts = {
      name: roomName,
      // timeout in seconds
      emptyTimeout: 10 * 60,
      maxParticipants: 20
    };
    const svc = new RoomServiceClient(
      this.livekitHost,
      this.apikey,
      this.secretkey
    );
    await svc.createRoom(opts);
  }
}
