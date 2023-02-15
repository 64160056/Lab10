import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.find({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    const updatedProduct = { ...product, ...updateProductDto };
    if (!product) {
      throw new NotFoundException();
    }
    this.productsRepository.save(updateProductDto);
    return this.productsRepository.save(updatedProduct);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
