import { expect } from "chai";
import { ethers, Contract, Signer } from "ethers";
import hre from "hardhat";
import { assert } from "console"

describe ("Box",function (){
    async function deployFixture() {
        const [
            owner,
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
      
        ] = await hre.ethers.getSigners();
        const Box = await hre.ethers.getContractFactory("Box");
        const box = await hre.upgrades.deployProxy(
            Box,
            [1],
            {initializer : "initialize", kind : "transparent"}
        );
        return {
            owner,
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            box
      
        }

    }
    beforeEach(async function () {


    });

    describe ("Adjust value", () => {
        it("should increase value successfully", async() => {
            const {
                owner,
                user1,
                user2,
                user3,
                user4,
                user5,
                user6,
                user7,
                user8,
                box 
            } = await deployFixture();
            await box.inc();
            expect(await box.val()).to.eq(2);
        })

        it ("should refuse non-operators' transactions", async() => {
            const {
                owner,
                user1,
                user2,
                user3,
                user4,
                user5,
                user6,
                user7,
                user8,
                box 
            } = await deployFixture();
            try {
                await box.connect(user1).inc();
            }
            catch(e){
                expect(e?.toString()).to.contains("AccessControlUnauthorizedAccount");
            }
        } )

        it("should decrease value successfully", async() => {
            const {
                owner,
                user1,
                user2,
                user3,
                user4,
                user5,
                user6,
                user7,
                user8,
                box 
            } = await deployFixture();
            await box.inc();
            expect(await box.val()).to.eq(2);
            await box.dec();
            expect(await box.val()).to.eq(1);
        })
    })
})