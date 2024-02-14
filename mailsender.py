import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os  # Import os module to access environment variables
from dotenv import load_dotenv  # Import load_dotenv
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Load environment variables from .env file
load_dotenv()
WEBSITE_URL = "https://valentinesplusplus-eb4adca6efcd.herokuapp.com/"

def fetchdata():
    scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive",
    ]
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)

    spreadsheet_id = os.getenv("SPREADSHEET_ID")
    spreadsheet = client.open_by_key(spreadsheet_id)

    worksheet = spreadsheet.get_worksheet(
        2
    )  # Assuming the data is in the first worksheet (index 0)
    # Get the values from the specified column (column C starting from row 2)
 
    senders = worksheet.col_values(2)[1:]
    recipients = worksheet.col_values(3)[1:]
    recipient_emails = worksheet.col_values(4)[1:]
    sender_emails = worksheet.col_values(8)[1:]
    codes = worksheet.col_values(10)[1:]
    return (senders, recipients, recipient_emails, sender_emails, codes)




# Email configuration
def sendmail(recipient_email, recipient_name, sender=True, code=None):
    sender_email = os.getenv("EMAIL")
    password = os.getenv("EMAIL_PASSWORD")  # Access password stored in an environment variable
    subject = "[Valentine’s++] A Heartfelt Surprise Awaits You! 🌟💌"
    body = ""

    if sender:
        body = f"""Dear {recipient_name},
We hope this email finds you with a heart full of anticipation! Your Valentine's++ gift package has been lovingly prepared and sent to your special someone. 💖

We wanted to let you know that everything is set for a day full of smiles, sweetness, and surprises. Please gently remind your loved one to visit VC++ booth in College Center, Main Building between 11AM and 5PM to pick up their gift package. It's a beautiful gesture that's sure to make their day even more memorable. 🎁✨

Thank you for choosing to spread love with Valentine's++. Your thoughtfulness is what makes this event so special. (＾-＾)v

Warmly,

The VC++ Team
        """
    else:
        body = f"""Dear {recipient_name},

Exciting news! Someone special has sent you a Valentine's++ gift package, filled with love and thoughtfulness just for you. 💕

To discover what awaits, please visit VC++’s booth in College Center, Main Building between 11AM and 5PM to pick up your surprise package. But that's not all – a unique code has been created for you to access a heartfelt message and your very own Valentine's card online. Simply visit {WEBSITE_URL} and enter the code {code} to unveil the love sent your way. 💻❤️

And there's a cherry on top! Don't miss out on our special Valentine's Theme Boba Tea – Strawberry Green Tea infused with Strawberry Popping Bubble and Fruit Jelly. It's the perfect treat to make your day even sweeter. 🍓🍵😊

We can't wait to see you and share in this moment of joy and sweetness. Remember, love is in the air, and it's all for you!

With all our hearts,

The VC++ Team

P.S. Don't forget to bring your smile! (＾▽＾)

"""

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
    
        server.login(sender_email, password)

        server.sendmail(sender_email, recipient_email, message.as_string())

    except Exception as e:
        print(f"Failed to send email. Error: {str(e)}")
    finally:
        server.quit()


if __name__ == "__main__":
    senders, recipients, recipient_emails, sender_emails, codes = fetchdata()
    


    for i in range(len(senders)):
        sender = senders[i]
        recipient = recipients[i]
        recipient_email = recipient_emails[i]
        sender_email = sender_emails[i]
        code = codes[i]
       
        # send to reciever of message
        sendmail(recipient_email, recipient, False, code)

        # send to sender of message
        sendmail(sender_email, sender)

   