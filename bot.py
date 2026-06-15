import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo
from aiohttp import web

TOKEN = "8938495968:AAGN24ePKwYvtj24AEX5RyVkWy6wp74pljE"
WEBAPP_URL = "https://arihsiboev64-blip.github.io/abcoin-clicker/"

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    kb = types.InlineKeyboardMarkup(inline_keyboard=[[
        types.InlineKeyboardButton(text="Играть в ABcoin", web_app=WebAppInfo(url=WEBAPP_URL))
    ]])
    await message.answer("Добро пожаловать в ABcoin!", reply_markup=kb)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())