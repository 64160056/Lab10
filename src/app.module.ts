import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      // ลิ้งค์ database http://localhost/phpmyadmin อย่าลืมใช้ xampp ด้วยนะ
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'product_db', // ชื่อฐานข้อมูลที่คุณต้องการใช้
      entities: [Product],
      synchronize: true, // ใช้ true สำหรับการพัฒนาหรือ testing, ควรตั้งเป็น false ใน production
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
