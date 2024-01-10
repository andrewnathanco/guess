package main

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"log/slog"
	"math/rand"
	"os"
	"strconv"

	"github.com/samber/lo"
)

func readCsvFile(filePath string) ([][]string, error) {
	f, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
		return nil, err
	}

	return records, nil
}

func exportToJSON(data interface{}, filename string) {
	file, err := os.Create(filename)
	if err != nil {
		must(err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)

	// Encode data and write to file
	err = encoder.Encode(data)
	if err != nil {
		must(err)
	}
}

func must(err error) {
	if err != nil {
		slog.Error(err.Error())
		panic(1)
	}
}
func getWordsFromFile(file_name string) []string {
	records, err := readCsvFile(file_name)
	must(err)

	// map the current records into just a list of words, basically flatten the csv structure
	return lo.Map[[]string, string](records, func(item []string, index int) string {
		if len(item) != 1 {
			must(err)
		}

		return item[0]
	})
}

func getWords() []string {
	game_words := getWordsFromFile("./input/scrabble.csv")
	medium_common := getWordsFromFile("./input/wiki-10k-formatted.csv")
	blacklist := getWordsFromFile("./input/blacklist.csv")

	game_words = lo.Intersect[string](game_words, medium_common)
	game_words, _ = lo.Difference[string](game_words, blacklist)

	r := rand.New(rand.NewSource(99))
	r.Shuffle(len(game_words), func(i, j int) { game_words[i], game_words[j] = game_words[j], game_words[i] })

	// overrides
	overrides, err := readCsvFile("./input/overrides.csv")
	must(err)

	for _, override := range overrides {
		game_key, err := strconv.ParseInt(override[0], 10, 64)
		word := override[1]
		must(err)

		// error handling
		if game_key >= int64(len(game_words)) {
			continue
		}

		// move the word to somewhere else in the list
		game_words = lo.Replace[string](game_words, game_words[game_key], game_words[game_key], 1)
		game_words[game_key] = word
	}

	return game_words
}

func main() {
	answers := getWords()
	all_words := getWordsFromFile("./input/scrabble.csv")
	exportToJSON(answers, "./output/game_words.json")
	exportToJSON(all_words, "./output/valid_words.json")
}
