const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class TopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "top",
            aliases: ["rank"],
            cooldown: 7,
            description: "Veja o top de meus usuários",
            usage: "<opção>",
            clientPermissions: ["EMBED_LINKS"],
            category: "info"
        })
    }
    async run(message, args) {

        const prefix = await this.client.database.Guilds.findOne({ id: message.guild.id })

        const txt = `Você deve escolher entre \`${prefix.prefix}top mamadores\`, \`${prefix.prefix}top mamados\`, \`${prefix.prefix}top demonios\`, \`${prefix.prefix}top anjos\`, \`${prefix.prefix}top semideuses\`, \`${prefix.prefix}top deuses\`, \`${prefix.prefix}top estrelinhas\`, \`${prefix.prefix}top votos\`, \`${prefix.prefix}top dungeon\` ou \`${prefix.prefix}top famílias\``

        const argumento = args[0];
        if (!argumento) return message.reply(txt)

        let argsDemonios = ["demonios", "demônios", "demons"];
        let argsAnjos = ["anjos"]
        let argsSemideuses = ["semideuses", "semi-deuses", "sd"];
        let argsDeuses = ["deuses", "gods"]
        let argsMamou = ["mamou", "mamadores"];
        let argsMamados = ["mamados", "chupados"];
        let argsEstrelinhas = ["estrelinhas", "estrelinha", "stars", "star", "money", "dinheiro"];
        let argsVotos = ["votadores", "voto", "votes", "votos", "upvotes", "upvote", "vote"];
        let argsDungeon = ["dungeon", "xp", "level", "vila", "rpg", "boleham"]
        let argsFamilias = ["famílias", "familias", "familia", "família"]

        if (argsMamou.includes(argumento)) {
            this.topMamadores(this.client, message)
        } else if (argsMamados.includes(argumento)) {
            this.topMamados(this.client, message)
        } else if (argsEstrelinhas.includes(argumento)) {
            this.topEstrelinhas(this.client, message)
        } else if (argsDemonios.includes(argumento)) {
            this.topDemonios(this.client, message)
        } else if (argsAnjos.includes(argumento)) {
            this.topAnjos(this.client, message)
        } else if (argsSemideuses.includes(argumento)) {
            this.topSD(this.client, message)
        } else if (argsDeuses.includes(argumento)) {
            this.topDeuses(this.client, message)
        } else if (argsVotos.includes(argumento)) {
            this.topVotos(this.client, message)
        } else if (argsDungeon.includes(argumento)) {
            this.topDungeon(this.client, message)
        } else if (argsFamilias.includes(argumento)) {
            this.topFamilia(this.client, message)
        } else message.reply(txt)

    }

    topMamados(client, message) {

        let embed = new MessageEmbed()

            .setTitle("👑 | Placar de Mamados")
            .setColor('#eab3fa')
        this.client.database.Users.find({}, ['mamadas', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                mamadas: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Mamado: **${res[i].mamadas}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Mamado: **${res[i].mamadas}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topMamadores(client, message) {

        let embed = new MessageEmbed()

            .setTitle("👑 | Placar de Mamadores")
            .setColor('#eab3fa')

        this.client.database.Users.find({}, ['mamou', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                mamou: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Mamou: **${res[i].mamou}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Mamou: **${res[i].mamou}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topDemonios(client, message) {

        let embed = new MessageEmbed()

            .setTitle("<:DEMON:758765044443381780> | Placar de Demônios")
            .setColor('#ec8227')

        this.client.database.Users.find({}, ['caçados', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                caçados: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Demônios: **${res[i].caçados}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Demônios: **${res[i].caçados}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topAnjos(client, message) {

        let embed = new MessageEmbed()

            .setTitle("<:ANGEL:758765044204437535> | Placar de Anjos")
            .setColor('#bdecee')

        this.client.database.Users.find({}, ['anjos', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                anjos: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Anjos: **${res[i].anjos}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Anjos: **${res[i].anjos}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topSD(client, message) {

        let embed = new MessageEmbed()

            .setTitle("<:SEMIGOD:758766732235374674> | Placar de Semi-Deuses")
            .setColor('#eab3fa')

        this.client.database.Users.find({}, ['semideuses', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                semideuses: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Semideuses: **${res[i].semideuses}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Semideuses: **${res[i].semideuses}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topDeuses(client, message) {

        let embed = new MessageEmbed()

            .setTitle("<:God:758474639570894899> | Placar de Deuses")
            .setColor('#a67cec')

        this.client.database.Users.find({}, ['deuses', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                deuses: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id);
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Deuses: **${res[i].deuses}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Deuses: **${res[i].deuses}**`, false)
                    }
                }
                message.channel.send(message.author, embed)
            })
    }

    topEstrelinhas(client, message) {

        let embed = new MessageEmbed()

            .setTitle("⭐ | Placar de Estrelinhas")
            .setColor('#74bd63')

        this.client.database.Users.find({}, ['estrelinhas', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                estrelinhas: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id)
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Estrelinhas: **${res[i].estrelinhas}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Estrelinhas: **${res[i].estrelinhas}**`, false)
                    }
                }
                message.channel.send(message.author, embed)

            })
    }

    topVotos(client, message) {
        let embed = new MessageEmbed()

            .setTitle("<:ok:727975974125436959> | Placar de Upvotes")
            .setColor('#ff29ae')

        this.client.database.Users.find({}, ['votos', 'nome', 'id'], {
            skip: 0,
            limit: 10,
            sort: {
                votos: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i].id)
                    if (!member) {
                        embed.addField(`**${i + 1} -** ${res[i].nome}`, `Upvotes: **${res[i].votos}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Upvotes: **${res[i].votos}**`, false)
                    }
                }
                message.channel.send(message.author, embed)

            })
    }

    topDungeon(client, message) {
        let embed = new MessageEmbed()

            .setTitle("<:Chest:760957557538947133> | Placar da Dungeon")
            .setColor('#a1f5ee')

        this.client.database.Rpg.find({}, ['level', '_id', 'xp'], {
            skip: 0,
            limit: 10,
            sort: {
                level: -1,
                xp: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                for (var i = 0; i < res.length; i++) {
                    let member = client.users.cache.get(res[i]._id)
                    if (!member) {
                        embed.addField(`**${i + 1} -** \`USER NOT FOUND\``, `Level: **${res[i].level}**\nXp: **${res[i].xp}**`, false)
                    } else {
                        embed.addField(`**${i + 1} -** ${member.username}`, `Level: **${res[i].level}**\nXp: **${res[i].xp}**`, false)
                    }
                }
                message.channel.send(message.author, embed)

            })
    }

    topFamilia(client, message) {
        let embed = new MessageEmbed()

            .setTitle("🔱 | Placar das Famílias")
            .setColor('#c780f3')

        this.client.database.Familias.find({}, ['_id', 'members', 'levelFamilia', 'bank'], {
            skip: 0,
            limit: 5,
            sort: {
                levelFamilia: -1,
                bank: -1
            }
        },
            function (err, res) {
                if (err) console.log(err)

                res.sort((a, b) => parseInt(b.bank) - parseInt(a.bank));

                for (var i = 0; i < res.length; i++) {
                    embed.addField(`${i + 1} - ${res[i]._id}`, `:fleur_de_lis: | **Nível da Família:** ${res[i].levelFamilia}\n💎 | **Dinheiro da Família:** ${res[i].bank}\n<:God:758474639570894899> | **Membros:** ${res[i].members.length}`)
                }
                message.channel.send(message.author, embed)
            })

    }
}