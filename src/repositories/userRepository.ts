import { prismaClient } from '../libs/constants';
import { UserType } from "./../libs/interfaces";

async function findById(id: number) {
    return prismaClient.user.findUnique({
        where: {
            id,
        },
    });
}

async function findByEmail(email: string) {
    return await prismaClient.user.findUnique({
        where: {
            email,
        },
    });
};

async function save(user: UserType) {
    return prismaClient.user.create({
        data: {
            email: user.email,
            nickname: user.nickname,
            password: user.password,
        },
    });
}

async function update(id: number, data: Partial<UserType>) {
    const { createdAt, updatedAt, articleLikes, productLikes, ...Newdata } = data;

    return prismaClient.user.update({
        where: {
            id,
        },
        data: {
            ...Newdata
        },
    });
}

// async function createOrUpdate(provider: string, providerId: string, email: string, name: string) {
//     return prismaClient.user.upsert({
//         where: { provider, providerId },
//         update: { email, name },
//         create: { provider, providerId, email, name },
//     });
// }

export default {
    findById,
    findByEmail,
    save,
    update
};
