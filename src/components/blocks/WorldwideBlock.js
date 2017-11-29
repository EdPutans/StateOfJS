import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapValues } from 'lodash'
import CountryBubble from '../charts/CountryBubble'

export default class WorldwideBlock extends Component {
    static propTypes = {
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            tool: null,
        }
    }

    setTool = tool => {
        this.setState({ tool })
    }

    render() {
        const { countries, tools, all } = this.props
        const { tool } = this.state

        const worldwideAverageData = {
            key: 'Worldwide average',
            ...mapValues(all, bucket => ({
                doc_count: bucket[`I've USED it before, and WOULD use it again`]
            }))
        }

        const data = [worldwideAverageData, ...countries.filter(({ key }) => key !== 'undefined')]

        return (
            <div className="block block--chart block--worldwide">
                <div className="block__description">
                    <p>
                        Tool usage by country (usage defined as respondents who picked
                        “have used before and would use again”). Red indicates higher compared to average, blue indicates lower
                        usage compared to average. 
                    </p>
                    <p>
                        Note: only countries which received over 200 total entries are shown. 
                    </p>
                </div>
                <div className="worldwide__grid">
                    {data.map(country => (
                        <div key={country.key} className="worldwide__grid__item">
                            <div className="worldwide__chart">
                                <CountryBubble
                                    keys={tools}
                                    data={country}
                                    currentTool={tool}
                                    setCurrentTool={this.setTool}
                                />
                            </div>
                            <h4 style={{ textAlign: 'center' }}>{country.key}</h4>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}