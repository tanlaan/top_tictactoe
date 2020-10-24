// Tic-Tac-Toe functionality

const gameBoard = (() => {
    let _state = [[null,null,null],
                  [null,null,null],
                  [null,null,null]]
    
    let _table = document.getElementsByTagName('table')[0]
    
    const makePlay = (player, move) => {
        if(_isValidMove(move)) {
            _addPlay(player, move)
            renderBoard()
            return true
        }
        alert('Bad move, try again.')
        return false
    }
    
    const _isValidMove = (move) => {
        let [x,y] = move
        if(_state[x][y] != null) {
            return false
        }
        return true
    }

    const _addPlay = (player, move) => {
        let [x,y] = move
        _state[x][y] = player
    }

    const resetBoard = () => {
        _state = [[null,null,null],
                  [null,null,null],
                  [null,null,null]]
        renderBoard()
    }

    const renderBoard = () => {
        _clearTable()
        for(i = 0; i < 3; i++) {
            let row = document.createElement('tr')
            for(j = 0; j < 3; j++){
                let column = document.createElement('td')
                let move = [i,j]
                column.addEventListener("click", () =>  {gameController.play(move)})
                if(_state[i][j] != null){
                    column.innerHTML = _state[i][j]
                }
                row.appendChild(column)
            }
            _table.appendChild(row)
        }
    }

    const _clearTable = () => {
        while(_table.firstChild) {
            _table.removeChild(_table.lastChild)
        }
    }

    const isWinState = () => {
        for(i = 0; i < 3; i++) {
            // Check Horizontals
            if(_state[i][0] != null && _state[i][0] === _state[i][1] && _state[i][1] === _state[i][2]) {
                return true
            }
            // Check Verticals
            if(_state[0][i] != null && _state[0][i] === _state[1][i] && _state[1][i] === _state[2][i]) {
                return true
            }
        }
        // Check Diagonals
        if(_state[0][0] != null && _state[0][0] === _state[1][1] && _state[1][1] === _state[2][2]) {
            return true
        }
        if(_state[0][2] != null && _state[0][2] === _state[1][1] && _state[1][1] === _state[2][0]) {
            return true
        }

        return false
    }

    return {
        makePlay,
        resetBoard,
        renderBoard,
        isWinState
    }
})()


const gameController = (() => {
    _currentPlayer = 'X'

    const start = () => {
        gameBoard.renderBoard()
        _hidePlayButton()
    }

    const _hidePlayButton = () => {
        let play = document.getElementById('play')
        play.style.display = 'none'
    }

    const restart = () => {
        gameBoard.resetBoard()
        _currentPlayer = 'X'
    }

    const play = (move) => {
        if(gameBoard.makePlay(_currentPlayer, move)) {
            if(gameBoard.isWinState()) {
                _displayWin()
                restart()
            } else {
                _togglePlayer()
            }
        }
    }

    const _togglePlayer = () => {
        if(_currentPlayer == 'X') {
            _currentPlayer = 'O'
        } else {
            _currentPlayer = 'X'
        }
    }

    const _displayWin = () => {
        alert(`${_currentPlayer} wins!`)
    }

    return {
        start,
        play,
        restart
    }
})()