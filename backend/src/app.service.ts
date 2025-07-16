import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  private readonly maxRetries = 5;
  private retryCount = 0;

  async onModuleInit() {
    const connectWithRetry = async (): Promise<void> => {
      try {
        await mongoose.connect('mongodb+srv://amarjeet229148:manish@cluster0.nk9we.mongodb.net/');
        this.logger.log('✅ MongoDB connected successfully');
      } catch (err) {
        this.logger.error('❌ MongoDB connection error:', err);
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.logger.warn(`⚠️ Retry connecting to MongoDB (${this.retryCount}/${this.maxRetries})`);
          setTimeout(connectWithRetry, 5000);
        } else {
          this.logger.error('❌ Max retries reached. Could not connect to MongoDB.');
        }
      }
    };
    await connectWithRetry();

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });

    if (mongoose.connection.readyState === 1) {
      this.logger.log('🔁 MongoDB is already connected');
    } else {
      this.logger.warn(`⏳ MongoDB initial state: ${mongoose.connection.readyState}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}