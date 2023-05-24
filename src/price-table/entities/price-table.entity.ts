




/*
Dodaj do API obsługę encji "PriceTable" złozonej z supplierId (wymagane, moze być jako zwykły integer, nie klucz obcy),
 effectiveFrom (wymagane), effectiveTo (opcjonalne).
API powinno zawierać operację dodawania i pobierania po ID oraz walidację danych wejściowych.
Np. EffectiveTo nie moze być przed EffectiveFrom.
Endpoint do pobierania po ID powinien zawierać dodatkową flagę która mówi czy cennik jest obecnie aktywny.
*/


import { Column, Index, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('price_table')
export class PriceTable extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  supplier_id: number

  @Column()
  effective_from: Date

  @Column()
  effective_to: Date
}
