const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const customers = [
    { name: 'Anton' },
    { name: 'John' },
    { name: 'Smith' }
]

const depositoTypes = [
    { name: 'bronze', yearly_return: 3 },
    { name: 'silver', yearly_return: 7 },
    { name: 'gold', yearly_return: 7 }
]

async function main() {
    try {
        // Upsert untuk tabel customer
        for (const { name } of customers) {
            const existingCustomer = await prisma.customer.findFirst({
                where: { name }
            })

            if (existingCustomer) {
                await prisma.customer.update({
                    where: { id: existingCustomer.id },
                    data: { name }
                })
            } else {
                await prisma.customer.create({
                    data: { name }
                })
            }
        }

        // Upsert untuk tabel deposito_type
        for (const { name, yearly_return } of depositoTypes) {
            const existingDepositoType = await prisma.deposito_type.findFirst({
                where: { name }
            })

            if (existingDepositoType) {
                await prisma.deposito_type.update({
                    where: { id: existingDepositoType.id },
                    data: { name, yearly_return }
                })
            } else {
                await prisma.deposito_type.create({
                    data: { name, yearly_return }
                })
            }
        }

        console.log('Customers and Deposito Types seeded')
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
