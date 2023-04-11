[
    {
        "name": "name",
        "label": "Vorname",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "surname",
        "label": "Nachname",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "sreet",
        "label": "Straße",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "house_number",
        "label": "Hausnummer",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "house_number_ext",
        "label": "Hausnummer (Zusatz)",
        "type": "text",
        "mandatory": false
    },
    {
        "name": "postcode",
        "label": "Postleitzahl (PLZ)",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "city",
        "label": "Stadt",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "e-mail",
        "label": "E-Mail",
        "type": "email",
        "mandatory": true
    },
    {
        "name": "membership_type",
        "label": "Für welche Art der Mitgliedschaft interessierst Du Dich?",
        "type": "radio_group",
        "options": [
            {
                "value": "participating",
                "label": "Aktive Mitgliedschaft"
            },
            {
                "value": "sponsor",
                "label": "Fördermitgliedschaft"
            }
        ],
        "mandatory": true
    },
    {
        "name": "contribution_amount_participating",
        "label": "Für welche jährliche Beitragshöhe (in €) entscheidest Du Dich?",
        "type": "radio_group",
        "options": [
            {
                "value": "regular",
                "label": "Regulär: 50€ im Jahr"
            },
            {
                "value": "discount",
                "label": "Reduziert: 25€ im Jahr (für Studierende und Personen mit Einkommen < 2.000 EUR brutto pro Monat, nach Rücksprache mit Finanzvorstand)",
                "free": "Befreiung: 0€ im Jahr (in begründeten Einzelfällen, nach Rücksprache mit Finanzvorstand)"
            }
        ],
        "mandatory": true
    },
    {
        "name": "contribution_amount_sponsor",
        "type": "text",
        "label": "Für welche jährliche Beitragshöhe (in €) entscheidest Du Dich?",
        "mandatory": true
    },
    {
        "name": "iban",
        "label": "Wie lautet Deine IBAN?",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "bic",
        "label": "Wie lautet Deine BIC?",
        "type": "text",
        "mandatory": true
    },
    {
        "name": "sepa",
        "label": "Lade hier bitte Dein unterschriebenes SEPA-Lastschriftmandat hoch.",
        "type": "file",
        "mandatory": true
    },
    {
        "name": "application_form",
        "label": "Lade hier bitte Dein unterschriebenes Eintrittsformular hoch.",
        "type": "file",
        "mandatory": true
    },
    {
        "name": "agreement",
        "label": "Ich habe die Datenschutzerklärung gelesen und erteile hiermit meine Zustimmung zur Verarbeitung und Nutzung meiner personenbezogenen Daten (Kontakt- und Kontodaten) zur Abwicklung verwaltungsrechtlicher Vereinsaktivitäten, wozu auch die Kontaktaufnahme bei Mitgliedsversammlungen gehört (nur für aktive Mitglieder). Diese Zustimmung erlischt mit meinem Vereinsaustritt automatisch.",
        "type": "checkbox",
        "mandatory": true
    }
]