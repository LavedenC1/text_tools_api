import codecs
import random
import re
import bcrypt
from flask import Flask, request, render_template, jsonify
import string
import base64
import hashlib
from urllib.parse import unquote, quote
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["10 per minute"]
)

# Reverse route
@app.route('/api/reverse', methods=['POST'])
def reverse_text():
    text = request.form.get('text')
    reversed_text = [x[::-1] for x in text.splitlines()]
    return jsonify({'result': '\n'.join(reversed_text)})

# Reverse Case Route
@app.route('/api/reverse_case', methods=['POST'])
def reverse_case():
    text = request.form.get('text')
    reversed_text = text.swapcase()
    return jsonify({'result': reversed_text})

# Shuffle route
@app.route('/api/shuffle', methods=['POST'])
def shuffle_text():
    text = request.form.get('text')
    shuffled_text = ''.join(random.sample(text, len(text)))
    return jsonify({'result': shuffled_text})
# To lowercase route
@app.route('/api/lowercase', methods=['POST'])
def reverse_text_lowercase():
    text = request.form.get('text')
    reversed_text = text.lower()
    return jsonify({'result': reversed_text})
# To uppercase route
@app.route('/api/uppercase', methods=['POST'])
def reverse_text_uppercase():
    text = request.form.get('text')
    reversed_text = text.upper()
    return jsonify({'result': reversed_text})

# Text length route
@app.route('/api/length', methods=['POST'])
def get_text_length():
    text = request.form.get('text')
    length = len(text)
    return jsonify({'result': length})

# Find/replace route
@app.route('/api/find_replace', methods=['POST'])
def find_replace():
    text = request.form.get('text')
    find = request.form.get('find')
    replace = request.form.get('replace')
    reversed_text = text.replace(find, replace)
    return jsonify({'result': reversed_text})

# Remove punctuation route
@app.route('/api/remove_punctuation', methods=['POST'])
def remove_punctuation():
    text = request.form.get('text')
    translator = str.maketrans('', '', string.punctuation)
    reversed_text = text.translate(translator)
    return jsonify({'result': reversed_text})

# Extract URLS from text route
@app.route('/api/extract_urls', methods=['POST'])
def extract_urls():
    text = request.form.get('text')
    urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)
    return jsonify({'result': urls})

# Extract emails from text route
@app.route('/api/extract_emails', methods=['POST'])
def extract_emails():
    text = request.form.get('text')
    emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
    return jsonify({'result': emails})

# Extract phone numbers from text route
@app.route('/api/extract_pns', methods=['POST'])
def extract_pns():
    text = request.form.get('text')
    phone_numbers = re.findall(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    return jsonify({'result': phone_numbers})

# Extract text from text from regex pattern route
@app.route('/api/extract_regex', methods=['POST'])
def extract_regex():
    text = request.form.get('text')
    pattern = request.form.get('pattern')
    matches = re.findall(pattern, text)
    return jsonify({'result': matches})

# Encode base64 route
@app.route('/api/encode_base64', methods=['POST'])
def encode_base64():
    text = request.form.get('text')
    encoded_text = base64.b64encode(text.encode('utf-8')).decode('utf-8')
    return jsonify({'result': encoded_text})

# Decode base64 route
@app.route('/api/decode_base64', methods=['POST'])
def decode_base64():
    text = request.form.get('text')
    decoded_text = base64.b64decode(text).decode('utf-8')
    return jsonify({'result': decoded_text})

# Caesar cipher route (+)
@app.route('/api/caesar_cipher', methods=['POST'])
def caesar_cipher():
    text = request.form.get('text')
    shift = int(request.form.get('shift'))
    reversed_text = ""
    for char in text:
        if char.isalpha():
            ascii_offset = 65 if char.isupper() else 97
            reversed_text += chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
        else:
            reversed_text += char
    return jsonify({'result': reversed_text})

# Remove duplicate lines route
@app.route('/api/remove_duplicates', methods=['POST'])
def remove_duplicates():
    text = request.form.get('text')
    lines = text.split('\n')    
    seen = set()
    unique_lines = []
    
    for line in lines:
        if line not in seen:
            unique_lines.append(line)
            seen.add(line)    
    reversed_text = '\n'.join(unique_lines)
    
    return jsonify({'result': reversed_text})


# Word frequency counter route
@app.route('/api/word_frequency', methods=['POST'])
def word_frequency():
    text = request.form.get('text')
    words = text.split()
    word_count = {}
    for word in words:
        if word in word_count:
            word_count[word] += 1
        else:
            word_count[word] = 1
    return jsonify({'result': word_count})

# MD5 hash route
@app.route('/api/md5_hash', methods=['POST'])
def md5_hash():
    text = request.form.get('text')
    hash_object = hashlib.md5(text.encode())
    reversed_text = hash_object.hexdigest()
    return jsonify({'result': reversed_text})
# SHA-256 hash route
@app.route('/api/sha256_hash', methods=['POST'])
def sha256_hash():
    text = request.form.get('text')
    hash_object = hashlib.sha256(text.encode())
    reversed_text = hash_object.hexdigest()
    return jsonify({'result': reversed_text})

# SHA1 hash route
@app.route('/api/sha1_hash', methods=['POST'])
def sha1_hash():
    text = request.form.get('text')
    hash_object = hashlib.sha1(text.encode())
    reversed_text = hash_object.hexdigest()
    return jsonify({'result': reversed_text})

# bCrypt hash route
@app.route('/api/bcrypt_hash', methods=['POST'])
def bcrypt_hash():
    text = request.form.get('text')
    rounds = int(request.form.get('rounds'))
    if(rounds > 3 and rounds < 21): 
        salt = bcrypt.gensalt(rounds=rounds)
        hashed_text = bcrypt.hashpw(text.encode(), salt)
        return jsonify({'result': hashed_text.decode('utf-8')})
    else:
        return jsonify({'result': 'Please respect the limit'})

# Password generator route with length, uppercase, lowercase, and special characters options, instead of true and flase, uses 1 and zero
@app.route('/api/password_generator', methods=['POST'])
def password_generator():
    length = int(request.form.get('length'))
    uppercase = int(request.form.get('uppercase'))
    lowercase = int(request.form.get('lowercase'))
    special_chars = int(request.form.get('special_chars'))

    # Define character sets
    uppercase_letters = string.ascii_uppercase if uppercase else ''
    lowercase_letters = string.ascii_lowercase if lowercase else ''
    digits = string.digits
    special_characters = string.punctuation if special_chars else ''

    # Combine character sets
    all_characters = uppercase_letters + lowercase_letters + digits + special_characters

    # Generate password
    password = ''.join(random.choice(all_characters) for _ in range(length))

    return jsonify({'result': password})

# Text to binary conversion route
@app.route('/api/binary_encode', methods=['POST'])
def binary_encode():
    text = request.form.get('text')
    binary_result = ' '.join(format(ord(char), '08b') for char in text)    
    return jsonify({'result': binary_result})

# Decode binary route
@app.route('/api/binary_decode', methods=['POST'])
def binary_decode():
    text = request.form.get('text')
    binary_values = text.split(' ')
    text = ''.join(chr(int(binary_value, 2)) for binary_value in binary_values)
    return jsonify({'result': text})

# Encode to Hex
@app.route('/api/hex_encode', methods=['POST'])
def hex_encode():
    text = request.form.get('text')
    return jsonify({'result': text.encode('utf-8').hex()})

# Decode from hex
@app.route('/api/hex_decode', methods=['POST'])
def hex_decode():
    text = request.form.get('text')
    return jsonify({'result': bytes.fromhex(text).decode('utf-8')})

# Url Encode
@app.route('/api/encode_url', methods=['POST'])
def encode_url():
    text = request.form.get('text')
    return jsonify({'result': quote(text)})

# Url decode
@app.route('/api/decode_url', methods=['POST'])
def decode_url():
    text = request.form.get('text')
    return jsonify({'result': unquote(text)})

@app.route("/api")
def api():
    return """
Wait for it
    """

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True,port=5000,host='0.0.0.0')
