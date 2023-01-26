export enum EStatus {
        OK = 'SUCCESS',

        FAIL = 'FAIL',

        ERROR = 'ERROR',
}

export enum EMessageStatus {
        m500 = 'There was an error on the server and the request could not be completed ',

        checkData = 'Vérifiez vos données saisies !!',

        x2 = 'Une des données que vous avez saisie existe déjà, merci de la modifier !!',

        Unknown = 'Donnée.s inexistante.s : ',

        Connected = `Vous êtes bien connecté.e !!`,

        passwordKO = `Le mot de passe ne corresponnd pas !!`,

        dataOK = 'Création réussie !!',

        dataKO = 'Création échouée !!!',

        updateOK = 'Modification réussie !!',

        updateKO = 'Modification échouée !!!',

        createdOK = 'La donnée a bien été créée !!',

<<<<<<< HEAD
        DeletedOK = 'La donnée a bien été supprimée !!',
=======
        forbidden = `L'utilisateur n'a pas l'authorisation d'accès !!`,
>>>>>>> 01a32ace7645d0ecc43424d61163099efc00eafb
}
