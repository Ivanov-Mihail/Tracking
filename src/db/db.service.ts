import { Injectable, Body } from '@nestjs/common';
import { Report } from './interfaces/report.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportDTO } from './dto/report.dto';

@Injectable()
export class DbService {
    constructor(@InjectModel('Report') private reportModel: Model<Report>) {}

    async saveReport(@Body()reportDto: ReportDTO){
        const newrep = new this.reportModel(reportDto);
        const result = await newrep.save();
        console.log(result);
    }
    
}
