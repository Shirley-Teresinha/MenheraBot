const Command = require("../../structures/command")
module.exports = class JoinFamilyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "família",
            aliases: ["familia", "family"],
            cooldown: 5,
            description: "Registra-se em uma família",
            category: "rpg"
        })
    }
    async run(message, args) {

        const user = await this.client.database.Rpg.findById(message.author.id)
        if (!user) return message.channel.send("<:negacao:759603958317711371> | Você não é um aventureiro!")

        if (user.level < 10) return message.channel.send("<:negacao:759603958317711371> | As famílias são liberadas no nível **10**")

        if (user.hasFamily) return message.channel.send(`<:negacao:759603958317711371> | Você já está na família ${user.familyName}!`)

        const familiasDisponiveis = ["Loki", "Ares", "Freya", "Soma", "Apolo"]
        const sortedFamily = familiasDisponiveis[Math.floor(Math.random() * familiasDisponiveis.length)];

        message.channel.send(`<:positivo:759603958485614652> | Bem-Vindo à família **${sortedFamily}**, ${message.author}! Veja seus novos Status!`)

        const familia = await this.client.database.Familias.findById(sortedFamily)

        switch (sortedFamily) {
            case 'Freya':
                user.maxMana = user.maxMana + familia.boost.value
                break;
            case 'Soma':
                user.maxLife = user.maxLife + familia.boost.value
                break;
            case 'Apolo':
                user.abilityPower = user.abilityPower + familia.boost.value
        }
        user.hasFamily = true
        user.familyName = sortedFamily
        user.save()

        familia.members.push(message.author.id.toString())
        familia.save()
    }
}

