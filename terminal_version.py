import pandas as pd
import random


class Player:
    def __init__(self, name, number):
        self.name = name
        self.number = number
        self.score = 0


class TriviaGame:
    def __init__(self, csv_file):
        self.questions = pd.read_csv(csv_file, delimiter=';')
        self.players = []

    def load_questions(self):
        self.questions['question'] = self.questions['question'].str.replace('\n', ' ')
        self.questions['answer'] = self.questions['answer'].str.replace('\n', ' ')

    def add_player(self, name):
        player_number = len(self.players) + 1
        player = Player(name, player_number)
        self.players.append(player)

    def display_scores(self):
        print("\nGame players and scores:")
        for player in self.players:
            print("Player {}: {} - Score: {}".format(player.number, player.name, player.score))

    def choose_random_question(self):
        random_index = random.choice(self.questions.index)
        question = self.questions.loc[random_index, 'question']
        answer = self.questions.loc[random_index, 'answer']
        return question, answer

    def play_game(self, points_limit):
        while True:
            question, answer = self.choose_random_question()
            print(f"\nQuestion: {question}. Hit any key for answer.")
            input()
            print("Answer:", answer)

            self.display_scores()

            while True:
                player_number_input = input("\nEnter the player number to add a point (or 0 for no one): ")
                try:
                    player_number = int(player_number_input)
                    if player_number == 0:
                        print("No point added.")
                        break
                    elif player_number <= len(self.players):
                        player = self.players[player_number - 1]
                        player.score += 1
                        print("Point added to Player {}.".format(player.number))
                        break
                    else:
                        print("Invalid player number.")
                except ValueError:
                    print("Invalid input. Please enter a valid player number.")

            self.display_scores()

            if any(player.score >= points_limit for player in self.players):
                break

        print("\nGame Over:")
        max_score = max(self.players, key=lambda x: x.score)
        winning_player = max_score.name
        print("The winner is {} with a score of {}.".format(winning_player, max_score.score))


if __name__ == "__main__":
    game = TriviaGame("questions_answers.csv")
    game.load_questions()

    while True:
        try:
            num_players = int(input("How many players?: "))
            break
        except ValueError:
            print("Invalid input. Please enter a valid number of players.")

    while True:
        try:
            points_limit = int(input("What is the winning number of points?: "))
            break
        except ValueError:
            print("Invalid input. Please enter a valid points limit.")

    for player_number in range(1, num_players + 1):
        name = input("Enter Player {} name: ".format(player_number))
        game.add_player(name)

    game.play_game(points_limit)
