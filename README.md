# node-file-manager
Attention.

In the implementation of the compress.js module, the command looks like this:
compress path_to_file path_to_destination.
The path_to_destination should be the path to the directory where the archive should be placed. In the decomress.js module, the behavior of the program is similar.

When checking Please note that after the deadline, I noticed an annoying typo in the code - in commit 66a5d72 in the CommandList.js file, I accidentally deleted line # 7 with the common command name - "os". Prior to this commit, the "os" commands were working properly. Except for this small error, the code is completely working. Please understand and forgive :)
