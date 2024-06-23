import {
  Controller,
  Get,
  Header,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
@ApiTags('coffees')
@UseInterceptors(LoggingInterceptor)
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  @Header('Cache-Control', 'max-age=30')
  @ApiOperation({ summary: 'Read all coffees' })
  @ApiOkResponse({ type: Coffee, isArray: true })
  findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Create coffee by id' })
  @ApiOkResponse({ type: Coffee })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<Coffee> {
    return this.coffeesService.findOne(Number(id));
  }

  // @Post()
  // create(@Body() createCoffeeDto: CreateCoffeeDto) {
  //   return this.coffeesService.create(createCoffeeDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
  //   return this.coffeesService.update(+id, updateCoffeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coffeesService.remove(+id);
  // }
}
