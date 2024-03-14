import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: User): Promise<User | boolean> {
    const userExists = await this.userModel.findOne({email: createUserDto.email})
    if (userExists) {
      
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    return createdUser.save();
  }

  async login(loginUserDto: User): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.activo) {
        return false;
      }
      return true; 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; 
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      return null; 
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user; 
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return !!existingUser;
  }

  

}
