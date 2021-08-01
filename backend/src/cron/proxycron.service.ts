import { ProxyEntity } from './../module/proxy/proxy.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProxyCronService {
  private readonly logger = new Logger(ProxyCronService.name);
  constructor(
    @InjectRepository(ProxyEntity)
    private proxyRepository: Repository<ProxyEntity>,
  ) {}
  public async setDefaultProxy() {
    try {
      const proxyDefault = await this.proxyRepository.findOne({
        status: true,
        validate: true,
        // active: true
      });
      if (!proxyDefault) {
        console.log('NO PROXY SET');
        return;
      } else {
        console.log('RUN PROXY :' + proxyDefault.ipAddress);
      }
    } catch (e) {
      console.log('ERROR REACT FACEBOOK CRON???');
    }
  }
}
