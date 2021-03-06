const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const checks = require("../../structures/RpgHandler").checks

module.exports = class BattleBoss extends Command {
    constructor(client) {
        super(client, {
            name: "boss",
            cooldown: 5,
            description: "Luta contra um BOSS",
            clientPermissions: ["EMBED_LINKS"],
            category: "rpg"
        })
    }
    async run(message, args) {

        const user = await this.client.database.Rpg.findById(message.author.id)
        if (!user) return message.channel.send("<:negacao:759603958317711371> | Você não é um aventureiro!")

        if (user.level < 20) return message.channel.send("<:negacao:759603958317711371> | Você precisa estar nível **20** para lutar contra bosses")

        const inimigo = await checks.getEnemy(user, "boss")
        const canGo = await checks.initialChecks(user, message)

        if (!canGo) return;

        let familia
        let dmgView = user.damage + user.weapon.damage
        let ptcView = user.armor + user.protection.armor

        if (user.hasFamily) {
            familia = await this.client.database.Familias.findById(user.familyName)
            if (user.familyName === "Loki") dmgView = user.damage + user.weapon.damage + familia.boost.value
            if (user.familyName === "Ares") ptcView = user.armor + user.protection.armor + familia.boost.value
        }

        const habilidades = await checks.getAbilities(user, familia)

        if (user.uniquePower.name == "Morte Instantânea") {
            habilidades.splice(habilidades.findIndex(function (i) {
                return i.name === "Morte Instantânea"
            }), 1);
        }
        
        let embed = new MessageEmbed()
            .setTitle(`⌛ | Preparação pra batalha`)
            .setDescription(`Envie um **SIM** para batalhar contra um boss`)
            .setColor('#e3beff')
            .setFooter("Estas habilidades estão disponíveis para o uso")
            .addField(`Seus status atuais são`, `🩸 | **Vida:** ${user.life}/${user.maxLife}\n💧 | **Mana:** ${user.mana}/${user.maxMana}\n🗡️ | **Dano Físico:** ${dmgView}\n🛡️ | **Armadura:** ${ptcView}\n🔮 | **Poder Mágico:** ${user.abilityPower}\n\n------HABILIDADES DISPONÍVEIS------`)
        habilidades.forEach(hab => {
            embed.addField(hab.name, `🔮 | **Dano:** ${hab.damage}\n💧 | **Custo** ${hab.cost}`)
        })
        message.channel.send(embed)

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 30000, errors: ["time"] });

        collector.on('collect', m => {
            if (m.content.toLowerCase() != "sim") return message.channel.send(`<:negacao:759603958317711371> | Você pensou melhor, e acabou desistindo de batalhar contra bosses`)

            this.battle(message, inimigo, habilidades, user, "boss", familia);
        })
    }

    async battle(message, inimigo, habilidades, user, type, familia) {

        user.dungeonCooldown = 3600000 + Date.now();
        user.inBattle = true;
        user.save()

        let options = [];

        if (user.hasFamily && user.familyName === "Loki") {

            options.push({
                name: "Ataque Básico",
                damage: user.damage + user.weapon.damage + familia.boost.value
            })
        } else {
            options.push({
                name: "Ataque Básico",
                damage: user.damage + user.weapon.damage
            })
        }

        habilidades.forEach(hab => {
            options.push(hab)
        })

        let texto = `Você entra na batalha contra Boss, e seu inimigo é: **${inimigo.name}**, Seus status são:\n\n❤️ | Vida: **${inimigo.life}**\n⚔️ | Dano: **${inimigo.damage}**\n🛡️ | Defesa: **${inimigo.armor}**\n\nO que você faz?\n\n**OPÇÕES:**\n`

        let escolhas = []

        for (var i = 0; i < options.length; i++) {
            texto += `\n**${i + 1}** - ${options[i].name} | **${options[i].cost || 0}**💧, **${options[i].damage}**🗡️`
            escolhas.push(i + 1);
        }

        let embed = new MessageEmbed()
            .setFooter("Digite no chat a opção de sua escolha")
            .setTitle("BossBattle: " + inimigo.name)
            .setColor('#f04682')
            .setDescription(texto)
        message.channel.send(message.author, embed)


        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000, errors: ["time"] });

        let time = false;

        collector.on('collect', m => {
            time = true;
            const choice = Number(m.content);
            if (escolhas.includes(choice)) {
                checks.battle(message, options[choice - 1], user, inimigo, type, familia)
            } else {
                checks.enemyShot(message, `⚔️ |  Você tentou uma técnica nova, mas não obteve sucesso! O inimigo ataca`, user, inimigo, type, familia)
            }
        })

        setTimeout(() => {
            if (!time) {
                checks.enemyShot(message, `⚔️ |  Você demorou para tomar uma atitude, e foi atacado!`, user, inimigo, type, familia)
            }
        }, 15000)
    }
}
