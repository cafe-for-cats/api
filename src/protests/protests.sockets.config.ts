import socketio from 'socket.io';
import { CommonSocketsConfig } from '../common/common.sockets.config';
import { ProtestsService } from './protests.service';
import { ProtestRepository } from './protest.repository';

export class ProtestSockets extends CommonSocketsConfig {
  constructor(
    io: socketio.Server,
    private protestsService: ProtestsService,
    private protestRepository: ProtestRepository
  ) {
    super(io, 'UsersSockets');
  }

  configureSockets() {
    this.io.of('/protests').on('connection', (socket: socketio.Socket) => {
      console.log(`↑  Connected client '${socket.id}' to socket /protests`);

      socket.on('getPins', async (input) => {
        try {
          const payload = await this.protestRepository.getProtestPins(
            input.protestId
          );

          socket.emit('getPins', {
            status: true,
            message: 'success',
            payload,
          });
        } catch (error) {
          console.error(error);

          socket.emit('getPins', 'Failure');
        }
      });

      socket.on('addProtest', async (input) => {
        try {
          const payload = await this.protestsService.addProtest(input);

          socket.emit('addProtest', {
            status: true,
            message: 'success',
            payload,
          });
        } catch (error) {
          console.error(error);

          socket.emit('addProtest', 'Failure');
        }

        return;
      });

      socket.on('getProtestsForUser', async ({ userId }) => {
        if (!userId) {
          socket.emit('getProtestsForUser', {
            status: false,
            message: `'input' is required.`,
          });
        }

        const payload = await this.protestRepository.getProtestsByUser(userId);

        socket.emit('getProtestsForUser', {
          status: true,
          message: 'Success',
          payload,
        });
      });
    });

    return this.io;
  }
}
