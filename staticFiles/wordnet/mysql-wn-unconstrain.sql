ALTER TABLE adjpositions DROP FOREIGN KEY fk_adjpositions_synsetid;
ALTER TABLE adjpositions DROP FOREIGN KEY fk_adjpositions_wordid;
ALTER TABLE casedwords DROP FOREIGN KEY fk_casedwords_wordid;
ALTER TABLE lexlinks DROP FOREIGN KEY fk_lexlinks_linkid;
ALTER TABLE lexlinks DROP FOREIGN KEY fk_lexlinks_synset1id;
ALTER TABLE lexlinks DROP FOREIGN KEY fk_lexlinks_synset2id;
ALTER TABLE lexlinks DROP FOREIGN KEY fk_lexlinks_word1id;
ALTER TABLE lexlinks DROP FOREIGN KEY fk_lexlinks_word2id;
ALTER TABLE morphmaps DROP FOREIGN KEY fk_morphmaps_morphid;
ALTER TABLE morphmaps DROP FOREIGN KEY fk_morphmaps_wordid;
ALTER TABLE samples DROP FOREIGN KEY fk_samples_synsetid;
ALTER TABLE semlinks DROP FOREIGN KEY fk_semlinks_linkid;
ALTER TABLE semlinks DROP FOREIGN KEY fk_semlinks_synset1id;
ALTER TABLE semlinks DROP FOREIGN KEY fk_semlinks_synset2id;
ALTER TABLE senses DROP FOREIGN KEY fk_senses_synsetid;
ALTER TABLE senses DROP FOREIGN KEY fk_senses_wordid;
ALTER TABLE synsets DROP FOREIGN KEY fk_synsets_lexdomainid;
ALTER TABLE vframemaps DROP FOREIGN KEY fk_vframemaps_frameid;
ALTER TABLE vframemaps DROP FOREIGN KEY fk_vframemaps_synsetid;
ALTER TABLE vframemaps DROP FOREIGN KEY fk_vframemaps_wordid;
ALTER TABLE vframesentencemaps DROP FOREIGN KEY fk_vframesentencemaps_sentenceid;
ALTER TABLE vframesentencemaps DROP FOREIGN KEY fk_vframesentencemaps_synsetid;
ALTER TABLE vframesentencemaps DROP FOREIGN KEY fk_vframesentencemaps_wordid;
ALTER TABLE adjpositions DROP INDEX k_adjpositions_synsetid;
ALTER TABLE adjpositions DROP INDEX k_adjpositions_wordid;
ALTER TABLE casedwords DROP INDEX k_casedwords_wordid;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_linkid;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_synset1id;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_synset1id_word1id;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_synset2id;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_synset2id_word2id;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_word1id;
ALTER TABLE lexlinks DROP INDEX k_lexlinks_word2id;
ALTER TABLE morphmaps DROP INDEX k_morphmaps_morphid;
ALTER TABLE morphmaps DROP INDEX k_morphmaps_wordid;
ALTER TABLE samples DROP INDEX k_samples_synsetid;
ALTER TABLE semlinks DROP INDEX k_semlinks_linkid;
ALTER TABLE semlinks DROP INDEX k_semlinks_synset1id;
ALTER TABLE semlinks DROP INDEX k_semlinks_synset2id;
ALTER TABLE senses DROP INDEX k_senses_lexid;
ALTER TABLE senses DROP INDEX k_senses_synsetid;
ALTER TABLE senses DROP INDEX k_senses_wordid;
ALTER TABLE synsets DROP INDEX k_synsets_lexdomainid;
ALTER TABLE vframemaps DROP INDEX k_vframemaps_frameid;
ALTER TABLE vframemaps DROP INDEX k_vframemaps_synsetid;
ALTER TABLE vframemaps DROP INDEX k_vframemaps_wordid;
ALTER TABLE vframesentencemaps DROP INDEX k_vframesentencemaps_sentenceid;
ALTER TABLE vframesentencemaps DROP INDEX k_vframesentencemaps_synsetid;
ALTER TABLE vframesentencemaps DROP INDEX k_vframesentencemaps_wordid;
ALTER TABLE casedwords DROP INDEX unq_casedwords_cased;
ALTER TABLE morphs DROP INDEX unq_morphs_morph;
ALTER TABLE senses DROP INDEX unq_senses_senseid;
ALTER TABLE senses DROP INDEX unq_senses_sensekey;
ALTER TABLE words DROP INDEX unq_words_lemma;
ALTER TABLE adjpositions DROP PRIMARY KEY;
ALTER TABLE adjpositiontypes DROP PRIMARY KEY;
ALTER TABLE casedwords DROP PRIMARY KEY;
ALTER TABLE lexdomains DROP PRIMARY KEY;
ALTER TABLE lexlinks DROP PRIMARY KEY;
ALTER TABLE linktypes DROP PRIMARY KEY;
ALTER TABLE morphs DROP PRIMARY KEY;
ALTER TABLE morphmaps DROP PRIMARY KEY;
ALTER TABLE postypes DROP PRIMARY KEY;
ALTER TABLE samples DROP PRIMARY KEY;
ALTER TABLE semlinks DROP PRIMARY KEY;
ALTER TABLE senses DROP PRIMARY KEY;
ALTER TABLE synsets DROP PRIMARY KEY;
ALTER TABLE vframes DROP PRIMARY KEY;
ALTER TABLE vframemaps DROP PRIMARY KEY;
ALTER TABLE vframesentences DROP PRIMARY KEY;
ALTER TABLE vframesentencemaps DROP PRIMARY KEY;
ALTER TABLE words DROP PRIMARY KEY;
