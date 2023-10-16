with open('questions.txt', 'r') as file:
    questions = file.readlines()
    question_dict = {}
    current_question = ""
    for line in questions:
        line = line.strip()
        if line.endswith('?'):
            current_question += line
            question_dict[current_question] = None
            current_question = ""
        else:
            current_question += line + " "

# Specify the file path for the new .txt file
new_file_path = "../modified_questions.txt"

# Open the new file in write mode
with open("modified_questions.txt", 'w') as new_file:
    for question in question_dict:
        new_file.write(question + "\n")
