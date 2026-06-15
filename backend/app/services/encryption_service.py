from cryptography.fernet import Fernet

KEY =  b"W1CXjtWQlpjmbZCp5cqnV2GZOPuc4MkFQh5JRK8EaYM="

cipher = Fernet(KEY)

def encrypt_file(file_path):

    with open(file_path, "rb") as file:

        data = file.read()

    encrypted_data = cipher.encrypt(
        data
    )

    encrypted_path = (
        file_path + ".enc"
    )

    with open(
        encrypted_path,
        "wb"
    ) as file:

        file.write(
            encrypted_data
        )

    return encrypted_path


def decrypt_file(file_path):

    with open(
        file_path,
        "rb"
    ) as file:

        encrypted_data = file.read()

    decrypted_data = cipher.decrypt(
        encrypted_data
    )

    return decrypted_data